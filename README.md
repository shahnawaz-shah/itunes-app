# iTunes Finder (Full-Stack React + Express)

A simple full-stack web app to search the iTunes Search API and manage a local (in-memory) favourites list. The frontend is built with React + Bootstrap; the backend is a small Express server that proxies iTunes requests and secures them with a lightweight JWT.

---

## Purpose

- Demonstrate an end-to-end React + Node/Express application.
- Provide a clean UI to search media (music, movies, podcasts, etc.).
- Show album-specific results (name, artist, artwork, release date).
- Keep a local favourites list (not persisted by design).

---

## Key Features

- **Search UI**: term input, media type selector, and result limit.
- **Albums endpoint**: `/api/music/albums` returns trimmed album data.
- **Generic search**: `/api/search` supports multiple media types.
- **Favourites**: add/remove favourites (stored in memory, reset on reload).
- **JWT-protected API**: frontend requests a short-lived token from `/api/token`.
- **Responsive**: Bootstrap layout for desktop and mobile.

---

## Tech Stack

- **Frontend**: React (Vite), React-Bootstrap/Bootstrap, Axios
- **Backend**: Node.js, Express, Axios, JSON Web Token (JWT)

---

## Project Structure

- itunes-app/
- frontend/ # React app (Vite)
- backend/ # Express server + iTunes proxy

---

## Setup & Run (Local)

### 1) Backend
- Move to backend and install dependencies
```bash
cd backend
npm install
```
- Create a .env file in backend/:
```
PORT=8000
JWT_SECRET=replace-with-a-long-random-string
ITUNES_COUNTRY=GB
```
- Start the server
```bash
npm start
```

### 2) Frontend
- Move to frontend and install dependencies
```bash
cd ../frontend
npm install
```
- Start the server
```bash
npm run dev
```
---

## Use app
- The app should now be running on `http://localhost:5173/`
