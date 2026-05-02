# Overtime Tracker

A modern, single-page web application to track your overtime hours, calculate earnings, and monitor your monthly goals. Built with a focus on a premium, distraction-free user experience featuring a glassmorphism aesthetic.

## 🚀 Features

*   **Google Authentication:** Secure and persistent login using NextAuth v5 (Auth.js) with Google OAuth.
*   **Direct Hours Input:** Easily add or subtract overtime hours with a clean numerical input interface.
*   **Monthly Goal Tracking:** Visual progress ring to monitor your tracked hours against your monthly target.
*   **Earnings Calculation:** Automatically calculates your extra earnings based on your customizable hourly rate.
*   **Premium UI:** Built with Tailwind CSS v4 and Framer Motion for smooth animations, micro-interactions, and a sleek dark/light mode glassmorphic design.
*   **Timezone Aware:** Strictly respects local time (UTC+8) for accurate daily and monthly logging.

## 🛠️ Tech Stack

*   **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
*   **Components:** [shadcn/ui](https://ui.shadcn.com/)
*   **Animations:** [Framer Motion](https://www.framer.com/motion/)
*   **Authentication:** [NextAuth v5 (Auth.js)](https://authjs.dev/)
*   **Database:** [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)

## ⚙️ Getting Started

### Prerequisites

*   Node.js 18+
*   A MongoDB database (e.g., MongoDB Atlas)
*   Google OAuth credentials (Client ID and Secret)

### Installation

1.  **Clone the repository and install dependencies:**
    ```bash
    npm install
    ```

2.  **Environment Variables:**
    Copy the `.env.local.example` file to `.env.local`:
    ```bash
    cp .env.local.example .env.local
    ```
    Fill in the required values:
    *   `MONGODB_URI`: Your MongoDB connection string.
    *   `NEXTAUTH_SECRET`: A secure random string (generate with `openssl rand -base64 32`).
    *   `NEXTAUTH_URL`: `http://localhost:3000` (for local development).
    *   `GOOGLE_CLIENT_ID`: Your Google OAuth Client ID.
    *   `GOOGLE_CLIENT_SECRET`: Your Google OAuth Client Secret.

    *Note: Ensure your current IP address is whitelisted in your MongoDB Atlas Network Access settings.*

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Configuration

You can customize your default preferences directly in the app via the Settings gear icon:
*   **Currency Symbol:** Set your preferred currency (e.g., NT$, $, €).
*   **Hourly Rate:** Set how much you earn per hour of overtime.
*   **Monthly Goal:** Set your target number of overtime hours for the month.
