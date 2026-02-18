// components\BookmarkList.tsx

"use client";

import React, { useEffect, useState, useMemo } from "react";
import BookmarkItem from "./BookmarkItem";
import { createClient } from "@/utils/supabase/client";

interface Bookmark {
    id: string;
    title: string;
    url: string;
    user_id?: string;
    created_at?: string;
}

export default function BookmarkList({ initialBookmarks, userId }: { initialBookmarks: Bookmark[]; userId: string }) {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks);
    // Create the client once using useMemo so it doesn't recreate on every render
    const supabase = useMemo(() => createClient(), []);

    useEffect(() => {
        setBookmarks(initialBookmarks);
    }, [initialBookmarks]);

    useEffect(() => {
        console.log("Setting up realtime subscription for user:", userId);

        const channel = supabase
            .channel("realtime_bookmarks_list")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "bookmarks",
                    // We explicitly tell Supabase: "Only send me events where user_id equals MY ID"
                    filter: `user_id=eq.${userId}`,
                },
                (payload) => {
                    console.log("Change received!", payload); // 3. Log the payload
                    if (payload.eventType === "INSERT") {
                        setBookmarks((prev) => [payload.new as Bookmark, ...prev]);
                    } else if (payload.eventType === "DELETE") {
                        setBookmarks((prev) => prev.filter((b) => b.id !== payload.old.id));
                    }
                },
            )
            .subscribe((status) => {
                // 4. Log the connection status
                console.log("Subscription status:", status);
            });

        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase, userId]);

    const handleDelete = async (id: string) => {
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
