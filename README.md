# MERN Notes App

This is my full stack notes app made with the MERN stack (MongoDB, Express, React, Node)
for Assignment 5. You can register, login and add/delete your own notes.

## Features
- Register and Login (with JWT token + password hashing using bcrypt)
- Add notes and delete notes
- Notes are saved in MongoDB and shown on the home page
- Only logged in users can see their notes

## Tech used
- Frontend: React (Vite), axios, react-router-dom
- Backend: Node, Express, Mongoose
- Database: MongoDB Atlas

## Folders
- `client` - the react frontend
- `server` - the express backend

## How to run locally

Backend:
```
cd server
npm install
```
Make a `.env` file (see .env.example) and put your MongoDB URI and a JWT secret.
Then run:
```
npm run dev
```

Frontend (new terminal):
```
cd client
npm install
npm run dev
```
Make a `.env` file in client with `VITE_API_URL=http://localhost:5000`

Open http://localhost:5173

## How to deploy on Vercel

I deployed the backend and frontend as two separate projects on Vercel.

### MongoDB
1. Make a free cluster on MongoDB Atlas
2. Add a database user and password
3. In Network Access allow 0.0.0.0/0 (so vercel can connect)
4. Copy the connection string

### Backend
1. Import the repo on Vercel
2. Set Root Directory to `server`
3. Add env variables: MONGODB_URI and JWT_SECRET
4. Deploy (you get a url like https://your-backend.vercel.app)

### Frontend
1. Import the same repo again on Vercel
2. Set Root Directory to `client`
3. Add env variable VITE_API_URL = your backend url
4. Deploy

That's it, the app works online now.

## TODO (maybe later)
- add edit note feature
- better error messages instead of alert
