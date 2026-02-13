"use client";

import React, { useState } from "react";

import { createClient } from "@/utils/supabase/client";

export default function BookmarkForm() {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      // Should handle error or redirect, but middleware handles protection
      return;
    }

    const { error } = await supabase.from("bookmarks").insert({
      title,
      url,
      user_id: user.id,
    });

    if (error) {
      console.error("Error adding bookmark:", error);
    } else {
      setUrl("");
      setTitle("");
    }
  };

  return (
    <div className="bg-white dark:bg-surface-dark rounded-xl shadow-lg shadow-slate-200/50 dark:shadow-black/20 border border-slate-200 dark:border-slate-800 p-6 md:p-8 mb-12">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-end">
        <div className="w-full md:flex-1">
          <label
            className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 ml-1"
            htmlFor="url">
            Website URL
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 material-icons text-lg">
              link
            </span>
            <input
              className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all outline-none"
              id="url"
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="w-full md:flex-1">
          <label
            className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 ml-1"
            htmlFor="title">
            Bookmark Title
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 material-icons text-lg">
              label
            </span>
            <input
              className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all outline-none"
              id="title"
              type="text"
              placeholder="My Awesome Site"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
        </div>
        <button
          className="w-full md:w-auto px-8 py-3 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2 group whitespace-nowrap cursor-pointer"
          type="submit">
          <span className="material-icons text-sm group-hover:scale-110 transition-transform">
            add
          </span>
          Add Bookmark
        </button>
      </form>
    </div>
  );
}
