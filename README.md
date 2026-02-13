# Smart Bookmark App

A minimalist, real-time bookmark manager built with **Next.js 14+**, **Supabase**, and **Tailwind CSS**.

## Features

- **Google Authentication**: Secure sign-in using Google OAuth.
- **Real-time Sync**: Bookmarks update instantly across devices and tabs without refreshing.
- **Privacy First**: Row Level Security (RLS) ensures users only access their own data.
- **Responsive Design**: A clean, modern interface that works on all devices.

## Tech Stack

- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS
- **Backend**: Supabase (Auth, Database, Realtime)
- **Styling**: Custom Tailwind theme with dark mode support

## Getting Started

### Prerequisites

- Node.js installed.
- A Supabase project with a `bookmarks` table and Google OAuth enabled.

### Installation

1.  **Clone the repository**:

    ```bash
    git clone <repository-url>
    cd smart-bookmark-app
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Environment Setup**:
    Create a `.env.local` file in the root directory and add your Supabase credentials:

    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
    ```

4.  **Run the development server**:

    ```bash
    npm run dev
    ```

5.  **Open the app**:
    Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

The app uses a single table `bookmarks`:

| Column       | Type          | Description             |
| :----------- | :------------ | :---------------------- |
| `id`         | `bigint`      | Primary Key             |
| `created_at` | `timestamptz` | default: `now()`        |
| `title`      | `text`        | Title of the bookmark   |
| `url`        | `text`        | URL of the bookmark     |
| `user_id`    | `uuid`        | References `auth.users` |

## License

This project is licensed under the MIT License.
