# 📝 ThinkBoard — MERN Stack Notes App

A full-stack notes application built with the **MERN stack** (MongoDB, Express.js, React, Node.js). ThinkBoard allows users to create, read, update, and delete notes with a clean, modern UI. It features rate limiting via Upstash Redis to prevent API abuse and is production-ready with a single deployment build.

> **Live Demo:** [mern-thinkboard-mjgd.onrender.com](https://mern-thinkboard-mjgd.onrender.com)
>
> **Live Repo:** [github.com/DasunBatheegama/mern-thinkboard](https://github.com/DasunBatheegama/mern-thinkboard)

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running in Development](#running-in-development)
  - [Building for Production](#building-for-production)
- [API Endpoints](#-api-endpoints)
- [Rate Limiting](#-rate-limiting)
- [Frontend Overview](#-frontend-overview)
- [Backend Overview](#-backend-overview)
- [Deployment](#-deployment)
- [License](#-license)

---

## ✨ Features

- **Create Notes** — Add new notes with a title and content.
- **View Notes** — Browse all notes displayed in a responsive card grid.
- **Edit Notes** — Update existing note title and content inline.
- **Delete Notes** — Remove notes with a confirmation dialog.
- **Note Detail View** — Click on any note to see its full content and edit or delete it.
- **Rate Limiting** — API requests are rate-limited using Upstash Redis (sliding window algorithm) to prevent abuse.
- **Rate Limit UI Feedback** — A user-friendly message is displayed when the rate limit is exceeded.
- **Toast Notifications** — Real-time success and error feedback using `react-hot-toast`.
- **Dark Theme** — DaisyUI "forest" theme for a polished, dark-mode interface.
- **Responsive Design** — Fully responsive layout across mobile, tablet, and desktop.
- **Production Build** — Single command builds both frontend and backend; Express serves the React static files in production.

---

## 🛠 Tech Stack

### Frontend

| Technology       | Purpose                        |
| ---------------- | ------------------------------ |
| React 19         | UI library                     |
| React Router 7   | Client-side routing            |
| Vite 7           | Build tool & dev server        |
| Tailwind CSS 3   | Utility-first CSS framework    |
| DaisyUI 4        | Tailwind CSS component library |
| Axios            | HTTP client for API requests   |
| Lucide React     | Icon library                   |
| React Hot Toast  | Toast notification system      |

### Backend

| Technology         | Purpose                              |
| ------------------ | ------------------------------------ |
| Node.js            | JavaScript runtime                   |
| Express 4          | Web application framework            |
| Mongoose 7         | MongoDB ODM (Object Data Modeling)   |
| Upstash Redis      | Serverless Redis for rate limiting   |
| @upstash/ratelimit | Rate limiting middleware             |
| dotenv             | Environment variable management      |
| CORS               | Cross-origin resource sharing        |
| Nodemon            | Auto-restart dev server on changes   |

### Database

| Technology | Purpose                          |
| ---------- | -------------------------------- |
| MongoDB Atlas | Cloud-hosted MongoDB database |

---

## 📁 Project Structure

```
mern-thinkboard/
├── package.json                  # Root scripts (build & start)
├── backend/
│   ├── package.json
│   └── src/
│       ├── server.js             # Express app entry point
│       ├── config/
│       │   ├── db.js             # MongoDB connection setup
│       │   └── upstash.js        # Upstash Redis & rate limiter config
│       ├── controllers/
│       │   └── notesController.js # CRUD logic for notes
│       ├── middleware/
│       │   └── rateLimiter.js    # Rate limiting middleware
│       ├── models/
│       │   └── Note.js           # Mongoose Note schema/model
│       └── routes/
│           └── notesRoutes.js    # API route definitions
└── frontend/
    ├── package.json
    ├── index.html                # HTML entry point
    ├── vite.config.js            # Vite configuration
    ├── tailwind.config.js        # Tailwind & DaisyUI config
    ├── postcss.config.js         # PostCSS config
    ├── eslint.config.js          # ESLint config
    └── src/
        ├── App.jsx               # Root component with routes
        ├── main.jsx              # React entry point
        ├── index.css             # Global styles (Tailwind directives)
        ├── components/
        │   ├── Navbar.jsx        # Top navigation bar
        │   ├── NoteCard.jsx      # Individual note card component
        │   ├── NoteNotFound.jsx  # Empty state when no notes exist
        │   └── RateLimitedUI.jsx # Rate limit exceeded message
        ├── lib/
        │   ├── axios.js          # Axios instance with dynamic base URL
        │   └── utils.js          # Utility functions (date formatting)
        └── pages/
            ├── HomePage.jsx      # Main page — displays all notes
            ├── CreatePage.jsx    # Form to create a new note
            └── NoteDetailPage.jsx # View, edit, and delete a single note
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)
- **MongoDB Atlas** account (or a local MongoDB instance)
- **Upstash Redis** account (for rate limiting)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/DasunBatheegama/mern-thinkboard.git
   cd mern-thinkboard
   ```

2. **Install all dependencies (root, backend, and frontend):**

   ```bash
   npm run build
   ```

   This single command installs dependencies for both `backend/` and `frontend/`, and builds the frontend production bundle.

   Alternatively, install them separately:

   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

### Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5001
UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token
NODE_ENV=development
```

| Variable                   | Description                                      |
| -------------------------- | ------------------------------------------------ |
| `MONGO_URI`                | MongoDB connection string (Atlas or local)        |
| `PORT`                     | Port for the Express server (default: `5001`)     |
| `UPSTASH_REDIS_REST_URL`   | Upstash Redis REST API URL                        |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST API token                      |
| `NODE_ENV`                 | `development` or `production`                     |

### Running in Development

Start the backend and frontend separately in two terminals:

**Terminal 1 — Backend:**

```bash
cd backend
npm run dev
```

The backend runs on `http://localhost:5001` with auto-reload via Nodemon.

**Terminal 2 — Frontend:**

```bash
cd frontend
npm run dev
```

The frontend runs on `http://localhost:5173` with Vite's HMR (Hot Module Replacement).

> In development mode, the backend enables CORS for `http://localhost:5173` so the frontend can communicate with the API.

### Building for Production

From the project root:

```bash
npm run build
npm start
```

- `npm run build` — Installs all dependencies and builds the React frontend into `frontend/dist/`.
- `npm start` — Starts the Express server, which serves the static frontend files and the API.

In production, the app is served entirely from the Express server on a single port (`5001` by default).

---

## 📡 API Endpoints

All endpoints are prefixed with `/api/notes`.

| Method   | Endpoint          | Description              | Request Body                |
| -------- | ----------------- | ------------------------ | --------------------------- |
| `GET`    | `/api/notes`      | Get all notes            | —                           |
| `GET`    | `/api/notes/:id`  | Get a single note by ID  | —                           |
| `POST`   | `/api/notes`      | Create a new note        | `{ "title", "content" }`    |
| `PUT`    | `/api/notes/:id`  | Update a note by ID      | `{ "title", "content" }`    |
| `DELETE` | `/api/notes/:id`  | Delete a note by ID      | —                           |

### Example Responses

**GET /api/notes** — Returns an array of notes sorted by newest first:

```json
[
  {
    "_id": "64f...",
    "title": "My First Note",
    "content": "This is the content of my first note.",
    "createdAt": "2026-02-20T10:00:00.000Z",
    "updatedAt": "2026-02-20T10:00:00.000Z"
  }
]
```

**POST /api/notes** — Creates and returns the new note:

```json
{
  "_id": "64f...",
  "title": "New Note",
  "content": "Note content here.",
  "createdAt": "2026-02-20T12:00:00.000Z",
  "updatedAt": "2026-02-20T12:00:00.000Z"
}
```

**Error Response (429 — Rate Limited):**

```json
{
  "message": "Too many requests. Please try again later."
}
```

---

## 🛡 Rate Limiting

ThinkBoard uses **Upstash Redis** with the `@upstash/ratelimit` package to enforce API rate limits.

| Setting            | Value                                                                 |
| ------------------ | --------------------------------------------------------------------- |
| **Algorithm**      | Sliding Window                                                        |
| **Limit**          | 10 requests per 20 seconds                                           |
| **Scope**          | Global (all API routes via middleware)                                |
| **Response**       | HTTP `429 Too Many Requests` with a JSON error message               |
| **Frontend UX**    | Displays a dedicated `RateLimitedUI` component with a friendly message |

### How It Works

1. Every incoming request passes through the `rateLimiter` middleware.
2. The middleware calls Upstash Redis to check if the rate limit has been exceeded.
3. If the limit is hit, the server responds with a `429` status code.
4. The frontend detects the `429` response and shows a rate-limit notification to the user.

---

## 🎨 Frontend Overview

### Routing

The app uses **React Router v7** with three routes:

| Path          | Page Component      | Description                    |
| ------------- | ------------------- | ------------------------------ |
| `/`           | `HomePage`          | Displays all notes in a grid   |
| `/create`     | `CreatePage`        | Form to create a new note      |
| `/note/:id`   | `NoteDetailPage`    | View, edit, or delete a note   |

### Components

| Component        | Description                                                        |
| ---------------- | ------------------------------------------------------------------ |
| `Navbar`         | Top navigation bar with the app title and "New Note" button         |
| `NoteCard`       | Displays a note preview (title, truncated content, date, actions)  |
| `NoteNotFound`   | Empty state shown when no notes exist                              |
| `RateLimitedUI`  | Banner displayed when the API rate limit is reached                |

### Styling

- **Tailwind CSS** for utility-first styling.
- **DaisyUI** component library with the **"forest"** dark theme.
- Custom radial gradient background for a unique visual aesthetic.
- Responsive grid layout: 1 column (mobile) → 2 columns (tablet) → 3 columns (desktop).

### Axios Configuration

The Axios instance dynamically sets its base URL:

- **Development:** `http://localhost:5001/api`
- **Production:** `/api` (relative, since Express serves both the API and frontend)

---

## ⚙ Backend Overview

### Server (`server.js`)

- Configures Express with JSON body parsing and rate limiting middleware.
- In **development**, enables CORS for `http://localhost:5173`.
- In **production**, serves the React build files from `frontend/dist/` and handles client-side routing with a catch-all route.
- Connects to MongoDB before starting the server.

### Database (`config/db.js`)

- Uses Mongoose to connect to MongoDB Atlas.
- Exits the process with code `1` if the connection fails.

### Note Model (`models/Note.js`)

| Field       | Type     | Required | Description         |
| ----------- | -------- | -------- | ------------------- |
| `title`     | String   | Yes      | Note title          |
| `content`   | String   | Yes      | Note body content   |
| `createdAt` | Date     | Auto     | Timestamp (auto)    |
| `updatedAt` | Date     | Auto     | Timestamp (auto)    |

### Controllers (`controllers/notesController.js`)

| Function       | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| `getAllNotes`   | Fetches all notes sorted by `createdAt` descending           |
| `getNoteById`  | Fetches a single note by its MongoDB `_id`                   |
| `createNote`   | Creates a new note with `title` and `content`                |
| `updateNote`   | Updates an existing note's `title` and `content` by `_id`    |
| `deleteNote`   | Deletes a note by its MongoDB `_id`                          |

---

## 🌐 Deployment

ThinkBoard is deployed on **[Render](https://render.com)** and is live at:

🔗 **[https://mern-thinkboard-mjgd.onrender.com](https://mern-thinkboard-mjgd.onrender.com)**

### Steps to Deploy on Render

1. **Push your code** to a GitHub repository.

2. **Create a new Web Service** on Render and connect your GitHub repo.

3. **Set environment variables** in the Render dashboard:
   - `MONGO_URI`
   - `PORT`
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
   - `NODE_ENV=production`

3. **Build command:**
   ```bash
   npm run build
   ```

4. **Start command:**
   ```bash
   npm start
   ```

5. The app will be served on the configured port, with Express handling both the API and the React frontend.

---

## 📄 License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).

---

<p align="center">
  Built with ❤️ using the MERN Stack
</p>
