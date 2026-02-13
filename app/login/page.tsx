"use client";

import React from "react";

import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const handleGoogleLogin = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <main className="flex-grow flex items-center justify-center relative px-4 sm:px-6 min-h-screen overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-glow pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none mix-blend-screen animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none mix-blend-screen"></div>

      {/* Login Card */}
      <div className="w-full max-w-md relative z-20">
        <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-surface-border shadow-2xl rounded-xl p-8 sm:p-12 text-center transition-all duration-300 hover:shadow-primary/10">
          {/* Logo Section */}
          <div className="mb-8 flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4 ring-1 ring-primary/20">
              {/* Abstract Bookmark Icon */}
              <svg
                className="w-8 h-8 text-primary"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Smart Bookmark
            </h1>
          </div>

          {/* Tagline */}
          <div className="mb-10">
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed">
              Save your links, access them anywhere.
            </p>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-2">
              Distraction-free, minimal, yours.
            </p>
          </div>

          {/* Action Button */}
          <div className="space-y-4">
            <button
              onClick={handleGoogleLogin}
              className="w-full group relative flex items-center justify-center gap-3 bg-white dark:bg-white text-slate-700 hover:text-slate-900 border border-slate-300 dark:border-slate-200 hover:bg-slate-50 font-semibold py-3.5 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background-dark shadow-sm hover:shadow-md cursor-pointer">
              {/* Google Logo */}
              <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"></path>
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"></path>
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"></path>
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"></path>
              </svg>
              <span>Sign in with Google</span>
              {/* Hover subtle arrow */}
              <span className="absolute right-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"></path>
                </svg>
              </span>
            </button>
            <div className="mt-6 flex items-center justify-center gap-2">
              <div className="h-px bg-slate-200 dark:bg-surface-border flex-1"></div>
              <span className="text-xs text-slate-400 dark:text-slate-600 font-medium uppercase tracking-wider">
                Secure Access
              </span>
              <div className="h-px bg-slate-200 dark:bg-surface-border flex-1"></div>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center">
          <nav className="flex justify-center space-x-6 text-sm">
            <a
              className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors duration-200"
              href="#">
              Terms of Service
            </a>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <a
              className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors duration-200"
              href="#">
              Privacy Policy
            </a>
          </nav>
          <p className="mt-4 text-xs text-slate-400 dark:text-slate-600">
            © 2024 Smart Bookmark. All rights reserved.
          </p>
        </div>
      </div>

      {/* Decorative bottom gradient */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-background-light dark:from-background-dark to-transparent pointer-events-none"></div>
    </main>
  );
}
