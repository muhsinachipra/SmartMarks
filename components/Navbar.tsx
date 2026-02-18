// components\Navbar.tsx

"use client";

import React from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function Navbar({ user }: { user?: User }) {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh(); // Refresh server components
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-surface-dark/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-lg">
              <span className="material-icons text-primary text-2xl">bookmarks</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Smart<span className="text-primary">Bookmark</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end mr-2">
              <span className="text-sm font-semibold text-slate-900 dark:text-white">
                {user?.email || "User"}
              </span>
              <button
                onClick={handleSignOut}
                className="text-xs text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer">
                Sign Out
              </button>
            </div>
            <button className="relative group ring-2 ring-transparent hover:ring-primary/50 rounded-full transition-all cursor-pointer">
              <img
                alt="User Avatar"
                className="h-10 w-10 rounded-full object-cover border-2 border-slate-200 dark:border-slate-700"
                src={
                  user?.user_metadata?.avatar_url ||
                  user?.identities?.[0]?.identity_data?.avatar_url ||
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuCXdnXO3xVxLhGIJeRDMIMPits0SPwxfmRR_a1jARpMF9DHbcdfX8ZNq0S7VIaCMCZCyrOzZ5gEdglpI99aYLGZj1H2R9o8qV3JdmpFKj3mIiTbhiDV07JTFGWx8qoCZXRkKn_mFFcL0K0JQgPa_nPxS3Kz_gOW4SoW15g0-sN3hFMsw-WFbB5idsklnB7QISb-W9QXCW7SCAt9W00KFKqsY9RnUWIYEAvowx8lZAVbdSxUBva1HdrcCsc43QcvMZdv6pck5VGKOl2o"
                }
              />
              <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white dark:border-surface-dark rounded-full"></div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
