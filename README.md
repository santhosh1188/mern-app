# MERN App: Admin Dashboard

## Overview
A MERN stack application for admin login, agent creation, CSV/XLSX/XLS upload, and equal lead distribution among 5 agents.

## Setup
1. **Backend**:
   - Navigate to `backend/`.
   - Install dependencies: `npm install`.
   - Create `.env` with:
   PORT=5000
MONGO_URI=mongodb+srv://<your_username>:<your_password>@cluster0.xxxxx.mongodb.net/mernapp?retryWrites=true&w=majority
JWT_SECRET=<32-char-secret-key>
- Run: `npm start` (port 5000).

2. **Frontend**:
- Navigate to `frontend/`.
- Install dependencies: `npm install`.
- Run: `npm start` (port 3000).

3. **Login**: `admin@example.com` / `password123`.

## Features
- Admin login with JWT authentication.
- Add agents (name, email, mobile, password).
- Upload CSV/XLSX/XLS with `FirstName`, `Phone`, `Notes`.
- Distribute leads equally among 5 agents; remainders to first agents.
- View distributed lists per agent.

## Tech Stack
- Backend: Node.js, Express, Mongoose, JWT, Multer
- Frontend: React, Axios, Bootstrap
- Database: MongoDB Atlas

## Demo Video
https://drive.google.com/file/d/1D-ZFYc3LIMtHBBruUusTrJfDF7GySAPS/view?usp=sharing

## Notes
- File validation: CSV/XLSX/XLS, correct column names.
- Security: JWT for protected routes, `multer@1.4.5-lts.1` for CVE fix.
- Distribution: `Math.floor(total / 5)` per agent, remainders sequential.
