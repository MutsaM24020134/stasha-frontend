# Stasha — Task Manager App

**Name:** Mutsawashe Maraidza  
**Student ID:** 24020134  
**Module:** INFS 202  
**Project:** Frontend Individual Project  

---

## What is Stasha?

Stasha is a task management web app I built for my INFS 202 midterm project. The name comes from the idea of "stashing" your tasks in one place so you never lose track of what needs to get done.

The app lets you create an account, log in, and manage your daily tasks. You can set priorities, add due dates, mark tasks as complete, and even view your tasks on a calendar. I also added a notes section and a settings page to make it feel like a complete product.

---

## Live Links

- **App:** https://stasha-frontend.vercel.app
- **API:** https://stasha-backend.onrender.com

---

## Tech I Used

**Frontend**
- React 18
- React Router v6
- Axios (for API calls)
- Lucide React (icons)
- Plus Jakarta Sans font (Google Fonts)
- Vite

**Backend**
- Node.js + Express
- SQLite with better-sqlite3
- JWT for authentication
- bcryptjs for password hashing
- dotenv + CORS

---

## What the App Can Do

- Register and login with a secure JWT token
- Forgot password — reset using a security question
- Add, edit, view and delete tasks
- Mark tasks as complete or pending
- Filter tasks by All, Pending or Completed
- Search tasks by name
- View tasks on a monthly calendar by due date
- Take notes with color coding
- Update profile, notifications and appearance in Settings
- All pages are protected — you must be logged in to access them

---

## Folder Structure
task-manager/
└── src/
├── components/
│   ├── Navbar.jsx
│   └── TaskCard.jsx
├── pages/
│   ├── Home.jsx
│   ├── List.jsx
│   ├── Details.jsx
│   ├── AddItem.jsx
│   ├── Calendar.jsx
│   ├── Notes.jsx
│   ├── Settings.jsx
│   └── Login.jsx
├── services/
│   └── api.js
├── App.jsx
└── main.jsx
---

## API Endpoints

### Auth
| Method | Endpoint | What it does |
|--------|----------|--------------|
| POST | /api/auth/register | Create a new account |
| POST | /api/auth/login | Login to your account |
| POST | /api/auth/forgot-password | Get your security question |
| POST | /api/auth/reset-password | Reset your password |

### Tasks
| Method | Endpoint | What it does |
|--------|----------|--------------|
| GET | /api/tasks | Get all your tasks |
| GET | /api/tasks/:id | Get one task |
| POST | /api/tasks | Create a task |
| PUT | /api/tasks/:id | Update a task |
| DELETE | /api/tasks/:id | Delete a task |

---

## How to Run It Locally

```bash
# Clone the repo
git clone https://github.com/MutsaM24020134/stasha-frontend.git
cd stasha-frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Then open http://localhost:5173 in your browser.

You can test with these credentials:
- Email: mutsa@student.ac.bw
- Password: password123

> Make sure the backend is also running for the app to work fully.

---

