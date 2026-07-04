# ⌚ Overtime Tracker

<div align="center">

![Next.js 16](https://img.shields.io/badge/Next.js%2016-black?style=for-the-badge&logo=next.js&logoColor=white)
![React 19](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind%20CSS%20v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![NextAuth v5](https://img.shields.io/badge/NextAuth%20v5-purple?style=for-the-badge&logo=next.js&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-black?style=for-the-badge&logo=framer&logoColor=blue)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)

**A state-of-the-art, premium glassmorphic web application to effortlessly track overtime hours, calculate extra earnings, and monitor monthly goals.**

[Key Features](#-key-features) • [Tech Stack](#-tech-stack--architecture) • [Getting Started](#-getting-started) • [Configuration](#-configuration) • [Contributing](#-contributing)

</div>

---

## 📌 GitHub Repository SEO & Metadata Configuration

> [!IMPORTANT]
> **For Repository Maintainers:** To maximize visibility, GitHub SEO, and search ranking, copy and paste the following information into your repository's **About** (settings) section on GitHub:

* **Repository Description**:
  ```text
  ✨ A state-of-the-art, glassmorphic overtime tracking and earnings calculation web app built with Next.js 16, Tailwind CSS v4, Framer Motion, NextAuth v5, and MongoDB. Track hours, monitor monthly goals, and visualize extra income with premium UI/UX.
  ```
* **Website URL**: `http://localhost:3000` *(or your live production deployment URL)*
* **Topics / Keywords**:
  `nextjs` `nextjs16` `react19` `tailwindcss` `tailwindcss-v4` `framer-motion` `glassmorphism` `overtime-tracker` `time-tracker` `salary-calculator` `nextauth` `authjs` `mongodb` `mongoose` `typescript` `shadcn-ui` `dark-mode` `productivity-tool` `web-application` `modern-ui`

---

## 💡 Why Overtime Tracker?

Traditional time-tracking tools and spreadsheets are clunky, tedious, and uninspiring. **Overtime Tracker** reimagines the employee time-logging experience by combining **precision time tracking** with **stunning visual rewards**. 

Whether you are logging extra work hours, calculating your accumulated overtime bonus, or working toward a financial target, Overtime Tracker provides a distraction-free, fluid, and premium experience engineered with modern web standards.

---

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| 🎨 **Premium Glassmorphic UI** | Designed with cutting-edge **Tailwind CSS v4** and **Framer Motion**. Features frosted glass cards (`.glass-card`), ambient floating background orbs, smooth micro-animations, and seamless dark/light mode switching. |
| ⚡ **Frictionless Hours Logging** | A streamlined numerical controller that allows adding or subtracting hours with instant feedback, tabular numerals, and keyboard shortcuts. |
| 🎯 **Dynamic Goal Ring** | An animated SVG progress ring that dynamically visualizes your accumulated overtime hours against your monthly target in real time. |
| 💰 **Real-Time Earnings Calculator** | Automatically calculates your extra income based on your customizable hourly rate and currency symbol (`NT$`, `$`, `€`, `¥`, etc.). |
| 📅 **Historical Month Navigation** | Effortlessly browse past months with instant summary calculations, interactive modals, and individual log deletion. |
| 🔐 **Secure OAuth Authentication** | Powered by **NextAuth v5 (Auth.js)** with Google OAuth and MongoDB persistence, ensuring your data remains private and securely synced. |
| 🌍 **Strict Local Timezone Accuracy** | Engineered specifically to respect local timezones (UTC+8 / `Asia/Taipei`) without UTC date-shifting bugs or boundary discrepancies. |

---

## 🛠️ Tech Stack & Architecture

Overtime Tracker is built on top of the latest and most robust modern web technologies:

| Category | Technology | Usage / Purpose |
| :--- | :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) | React App Router, Server Actions, and Server-Side Rendering (SSR) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | End-to-end type safety, strict interface definitions, and enhanced IDE support |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Next-generation utility-first CSS with OKLCH color spaces and custom design tokens |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) | Accessible, customizable, unstyled primitive components |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) | Fluid gesture animations, layout transitions, and ambient background effects |
| **Authentication** | [NextAuth v5 (Auth.js)](https://authjs.dev/) | Secure Google OAuth 2.0 authentication and session management |
| **Database** | [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/) | Document-based cloud data storage and schema validation |

---

## 🎨 Design System & Aesthetics

Our UI/UX architecture strictly adheres to modern web design principles:
- **OKLCH Color Spaces**: Vibrant, perceptually uniform color palettes tailored for both light and dark themes.
- **Ambient Mesh Gradients**: Subtle, multi-point radial gradients (`.mesh-gradient`) that give deep visual depth to the workspace.
- **Frosted Glassmorphism**: High-blur backdrop filters (`backdrop-blur-3xl`, `.glass-card`) with multi-layered opacity borders that elevate content hierarchy.
- **Zero-Clutter Scrollbars**: Custom `.scrollbar-hide` utility ensuring smooth viewport scrolling without intrusive browser scrollbars.

---

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **Package Manager**: `npm`, `pnpm`, or `yarn`
* **Database**: A MongoDB instance (e.g., [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) free tier)
* **OAuth Credentials**: Google Cloud Console OAuth 2.0 Client ID and Secret

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Vallykrie/OvertimeTracker.git
   cd OvertimeTracker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy the template environment file:
   ```bash
   cp .env.local.example .env.local
   ```
   Open `.env.local` and configure the following variables:

   | Variable | Description | Example |
   | :--- | :--- | :--- |
   | `MONGODB_URI` | Your MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/overtime` |
   | `NEXTAUTH_SECRET` | Secret key for JWT encryption (run `openssl rand -base64 32`) | `dGhpcy1pcy1hLXNlY3JldC1rZXk...` |
   | `NEXTAUTH_URL` | Base URL of your application | `http://localhost:3000` |
   | `GOOGLE_CLIENT_ID` | Google OAuth Client ID | `123456789-abc.apps.googleusercontent.com` |
   | `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret | `GOCSPX-abcdefghijklmnop` |

   > [!NOTE]
   > Ensure that your current IP address is whitelisted in your MongoDB Atlas Network Access settings!

4. **Launch the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to start tracking your overtime!

---

## ⚙️ Configuration

Overtime Tracker allows you to customize your personal preferences directly inside the app via the **Settings** dialog (gear icon in the top header):

* 💱 **Currency Symbol**: Customize the display currency symbol (`NT$`, `$`, `€`, `¥`, `£`, etc.).
* 💵 **Hourly Rate**: Define your personal overtime earnings rate per hour.
* 🎯 **Monthly Goal**: Set your target overtime hours for the month to dynamically adjust the goal ring.

---

## 🗺️ Roadmap & Future Enhancements

- [ ] 📊 **Export Reports**: Generate downloadable PDF and CSV summaries of monthly overtime logs.
- [ ] 🔔 **Goal Notifications**: Automated browser/email alerts when reaching monthly targets.
- [ ] 🌓 **Custom Theme Palettes**: Additional curated color schemes (e.g., Cyberpunk, Nordic Frost, Sunset Emerald).
- [ ] 📈 **Annual Analytics Dashboard**: Multi-month trends and year-over-year earnings comparisons.

---

## 🤝 Contributing

Contributions, issues, and feature requests are warmly welcomed! 
If you have suggestions for improving the user experience or adding new features:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">
  <p>Built with ❤️ by Nathan for Aching</p>
</div>
