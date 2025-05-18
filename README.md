# AI Idea Generator

A simple practice project to generate creative project ideas using AI.

## Live Demo

You can see the live version of this project deployed on Vercel here:

[https://ai-idea-generator-psi.vercel.app/](https://ai-idea-generator-psi.vercel.app/)

## Overview

This project integrates the following web development technologies:

- **Next.js**
- **Supabase**
- **Gemini AI**
- **Shadcn UI**
- **Tailwind CSS**

The core functionality of this project is to register and allow logged-in users to trigger the Gemini AI model to generate novel project ideas based on a prompt.

## Getting Started (for local development)

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/pratyusha-ds/ai-idea-generator
    cd idea-generator
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of your project and add your Supabase and Gemini AI API keys:

    ```env
    NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    GEMINI_API_KEY=YOUR_GEMINI_API_KEY
    ```

    - You can find your Supabase URL and Anon Key in your Supabase project settings.
    - You'll need to obtain a Gemini AI API key from the Google AI Studio.

4.  **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

    Open your browser and navigate to `http://localhost:3000`.
