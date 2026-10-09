# 1 Byte GK 🧠⚡

> Sharpen Your Mind with 1 Byte GK – 50 Questions. 1 Daily Streak. 1 Byte Smarter.

1 Byte GK is a full-stack gamified General Knowledge learning platform designed to make learning fun, interactive, and rewarding. Whether you are preparing for competitive exams or just want to improve your general knowledge, 1 Byte GK helps you stay consistent.

## ✨ Features

- **🔥 Daily Challenges:** Answer 50 questions daily to keep your mind sharp.
- **⚡ Streaks & XP:** Maintain your daily streak and earn XP points for your progress.
- **🏆 Leaderboards:** Compete with others and track your global ranking.
- **📚 Subject-Wise Learning:** Practice specific subjects like History, Polity, Geography, Science, English, and General Aptitude.
- **👑 Flexible Plans:** Choose between Normal and Pro subscription tiers to unlock premium question series, Previous Year Questions (PYQs), and advanced analytics.

## 🛠️ Tech Stack

**Frontend (Client)**
- React (Vite)
- Tailwind CSS
- Framer Motion (Animations)
- Zustand (State Management)
- React Router

**Backend (Server)**
- Node.js & Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT) & bcryptjs (Authentication)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (Local installation or MongoDB Atlas cluster)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/venkatesh0963/1-BYTE-GK.git
   cd 1-BYTE-GK
   ```

2. **Setup the Backend (Server):**
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file inside the `server` directory and add your environment variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
   Start the backend development server:
   ```bash
   npm run dev
   # or
   node server.js
   ```

3. **Setup the Frontend (Client):**
   ```bash
   cd ../client
   npm install
   ```
   Create a `.env` file inside the `client` directory (optional, for custom API URL):
   ```env
   VITE_API_URL=http://localhost:5000
   ```
   Start the frontend development server:
   ```bash
   npm run dev
   ```

4. **Open in Browser:**
   Visit `http://localhost:3000` to view the application!

## 📦 Deployment (Vercel)

This project is configured as a Monorepo and is ready to be deployed on **Vercel**.
- The `vercel.json` file in the root directory automatically configures Vercel to build the Vite frontend and expose the Express backend as Serverless Functions.
- Ensure you set the required environment variables (`MONGO_URI`, `JWT_SECRET`) in your Vercel project settings.

---
*Built with ❤️ for learners everywhere.*