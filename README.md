# 📚 Library Management System

A full-stack web application for managing books, readers, and lending transactions in a library. Built with a React frontend and a Node.js/Express backend.

## 🌐 Live Preview

Check out the live app:  
👉 [https://library-management-neon-chi.vercel.app](https://library-management-neon-chi.vercel.app)

---

## 🚀 Tech Stack

### Frontend:
- React (TypeScript)
- Tailwind CSS
- Axios
- React Router
- Toastify for notifications

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)
- RESTful API

---

## 🛠️ Installation & Setup (Local Development)

### 1. Clone the Repository

git clone https://github.com/YOUR-USERNAME/library-system.git
cd library-system

2. Frontend Setup
bash
Copy
Edit
cd frontend
npm install
npm run dev

3. Backend Setup
bash
Copy
Edit
cd backend
npm install
npm run dev
📝 You’ll need to configure a .env file in the backend folder with your MongoDB URI and other environment variables.

☁️ Deployment
🔵 Frontend on Vercel
Go to Vercel and log in with GitHub.

Import your GitHub repo.

Set the project root to frontend/.

Configure the build settings (Vercel usually auto-detects React).

Deploy! 🎉

🟣 Backend on Railway
Go to Railway and log in.

Click New Project → Deploy from GitHub Repo.

Choose the backend folder as the root.

Add required environment variables (MONGODB_URI, etc).

Deploy the backend.

Set the live backend API URL in the frontend .env as VITE_API_BASE_URL.

📂 Folder Structure
perl
Copy
Edit
library-system/
├── backend/           # Express.js API
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
├── frontend/          # React app
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.tsx
└── README.md
🧪 Features
📖 Add, edit, delete books

👤 Manage readers

🔄 Issue and return books

🕒 Track overdue returns

📈 Responsive dashboard

📬 Email notifications (optional)

🌍 Deployed with Vercel and Railway

🙋‍♂️ Author
Mahesh Hansaka
📧 Contact Me
🔗 LinkedIn | GitHub
