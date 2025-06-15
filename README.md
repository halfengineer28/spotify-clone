
# 🎧 Spotify Clone — Full-Stack Realtime Music App

A full-stack **Spotify Clone** with real-time features like chat, music streaming, admin dashboard, and live user tracking — built using modern technologies like **React**, **Node.js**, **MongoDB**, **Tailwind CSS**, **Socket.io**, and **Clerk** for authentication.

> 🚀 This is a personal project and not affiliated with Spotify.

---

## 📺 Demo

🔗 [Live Demo](#https://spotify-clone-da1h.onrender.com)  



---

## ✨ Features

- 🎵 Listen to music with full playback controls
- ⏮️ Play next/previous songs
- 🔊 Volume slider for dynamic audio control
- 💬 Realtime chat between users
- 👥 See what other users are listening to in real-time
- 🧑‍💼 Admin dashboard to upload albums and songs
- 📈 Analytics page with aggregated data
- 🟢 Online/Offline user status tracking
- 🔐 Secure authentication using **Clerk**
- ☁️ Cloud storage integration with **Cloudinary**

---

## 🧰 Tech Stack

### Frontend

- React + Vite
- Tailwind CSS
- Zustand (State Management)
- Clerk (Authentication)
- Socket.io-client

### Backend

- Node.js + Express.js
- MongoDB (Mongoose)
- Socket.io
- Cloudinary
- Clerk

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/halfengineer28/spotify-clone.git
cd spotify-clone
```

### 2. Setup Backend

```bash
cd backend
npm install
```

#### Create `.env` file in `backend/`

```env
PORT=3000
MONGODB_URI=your_mongodb_uri
ADMIN_EMAIL=admin@example.com
NODE_ENV=development

CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name

CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_key
```

Then run:

```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
```

#### Create `.env` file in `frontend/`

```env
VITE_CLERK_PUBLISHABLE_KEY=your_key
```

Then run:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---




---

> © 2025 [halfengineer28](https://github.com/halfengineer28)
