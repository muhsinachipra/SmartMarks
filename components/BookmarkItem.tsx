"use client";

import React from "react";

interface Bookmark {
  id: number;
  title: string;
  url: string;
}

interface BookmarkItemProps {
  bookmark: Bookmark;
  onDelete: (id: number) => void;
}

export default function BookmarkItem({ bookmark, onDelete }: BookmarkItemProps) {
  const firstLetter = bookmark.title.charAt(0).toUpperCase();

  // Simple color mapping based on first letter (for demo)
  const colors = [
    "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
    "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
    "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400",
  ];
  const colorClass = colors[bookmark.title.length % colors.length] || colors[0];

  return (
    <div className="group relative bg-white dark:bg-surface-dark border border-transparent hover:border-slate-200 dark:hover:border-slate-700 rounded-lg p-4 transition-all hover:shadow-md hover:translate-x-1 flex items-center gap-4">
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${colorClass}`}>
        {firstLetter}
      </div>
      <div className="flex-grow min-w-0">
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors truncate">
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="focus:outline-none">
            <span aria-hidden="true" className="absolute inset-0"></span>
            {bookmark.title}
          </a>
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 truncate font-mono">
          {bookmark.url}
        </p>
      </div>
      <div className="flex-shrink-0 z-10">
        <button
          title="Delete bookmark"
          aria-label="Delete bookmark"
          onClick={(e) => {
            e.stopPropagation(); // Prevent ensuring link click
            // In a real app with nested interactive elements inside an anchor/link wrapper,
            // structure might need adjustment, but here the delete button is z-10
            // and the link has a span defined as absolute inset-0.
            // However, the link is technically inside the h3, and the span covers the PARENT of the h3's logical block? No.
            // The HTML structure has the span inside the anchor which is inside the h3.
            // The span has absolute inset-0. But relative parent is the group div.
            // So the span covers the whole card.
            // Z-10 on button should keep it clickable.
            onDelete(bookmark.id);
          }}
          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors flex items-center justify-center cursor-pointer">
          <span className="material-symbols-outlined text-xl">delete</span>
        </button>
      </div>
    </div>
  );
}
