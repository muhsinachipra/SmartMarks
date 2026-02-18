// app\page.tsx

import Navbar from "@/components/Navbar";
import BookmarkForm from "@/components/BookmarkForm";
import BookmarkList from "@/components/BookmarkList";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const { data: bookmarks } = await supabase.from("bookmarks").select("*").order("created_at", { ascending: false });

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar user={user} />
            <main className="grow w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
                        Manage your digital library
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
                        Keep your favorite links organized and distraction-free. Add a new bookmark below to get
                        started.
                    </p>
                </div>
                <BookmarkForm />
                <BookmarkList initialBookmarks={bookmarks || []} userId={user.id} />
            </main>
            <footer className="w-full py-6 mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark text-center">
                <p className="text-sm text-slate-400 dark:text-slate-600">
                    © 2023 Smart Bookmark. Focus on what matters.
                </p>
            </footer>
        </div>
    );
}
