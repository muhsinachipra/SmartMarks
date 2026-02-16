"use client";

import React, { useEffect, useState } from "react";
import BookmarkItem from "./BookmarkItem";
import { createClient } from "@/utils/supabase/client";

interface Bookmark {
    id: number;
    title: string;
    url: string;
    user_id?: string;
    created_at?: string;
}

export default function BookmarkList({ initialBookmarks }: { initialBookmarks: Bookmark[] }) {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks);
    const supabase = createClient();

    useEffect(() => {
        setBookmarks(initialBookmarks);
    }, [initialBookmarks]);

    useEffect(() => {
        const channel = supabase
            .channel("realtime bookmarks")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "bookmarks",
                },
                (payload) => {
                    if (payload.eventType === "INSERT") {
                        setBookmarks((prev) => [payload.new as Bookmark, ...prev]);
                    } else if (payload.eventType === "DELETE") {
                        setBookmarks((prev) => prev.filter((b) => b.id !== payload.old.id));
                    }
                },
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase]);

    const handleDelete = async (id: number) => {
        // Optimistic update
        setBookmarks((prev) => prev.filter((b) => b.id !== id));

        const { error } = await supabase.from("bookmarks").delete().eq("id", id);
        if (error) {
            console.error("Error deleting bookmark:", error);
            // Revert or fetch again if failed (simple implementation for now)
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-6 px-2">
                <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Recent Bookmarks</h2>
                <div className="flex gap-2">
                    <button
                        className="p-2 text-slate-400 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer"
                        title="Grid View">
                        <span className="material-icons">grid_view</span>
                    </button>
                    <button
                        className="p-2 text-primary bg-primary/10 dark:bg-primary/20 rounded transition-colors cursor-pointer"
                        title="List View">
                        <span className="material-icons">view_list</span>
                    </button>
                </div>
            </div>

            {bookmarks.map((bookmark) => (
                <BookmarkItem key={bookmark.id} bookmark={bookmark} onDelete={handleDelete} />
            ))}

            {bookmarks.length === 0 && (
                <div className="text-center py-10 text-slate-500">No bookmarks found. Add one above!</div>
            )}
        </div>
    );
}
