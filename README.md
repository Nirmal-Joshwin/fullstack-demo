# Task Manager - MERN Stack Project

This is my full stack web application made using the MERN stack (MongoDB, Express, React, Node.js) for Assignment-5.

Users can register and login. After logging in they can add, view, complete and delete their own tasks. All the data is stored in a MongoDB database.

## Technologies Used

- MongoDB - database
- Express + Node.js - backend / API
- React - frontend
- JWT - for login authentication (tokens)
- bcryptjs - for hashing passwords

## How to Run the Project

You need Node.js and MongoDB installed on your computer first.

### Backend (server)

1. Open a terminal and go into the backend folder:

   ```
   cd backend
   ```

2. Install the packages:

   ```
   npm install
   ```

3. Make a file called `.env` (you can copy `.env.example`) with these values:

   ```
   MONGO_URI=mongodb://localhost:27017/taskapp
   JWT_SECRET=mysecretkey
   PORT=5000
   ```

4. Start the server:

   ```
   npm run dev
   ```

   If it works you will see "MongoDB connected" and "Server running on port 5000".

### Frontend (React app)

1. Open a NEW terminal and go into the frontend folder:

   ```
   cd frontend
   ```

2. Install the packages:

   ```
   npm install
   ```

3. Start the app:

   ```
   npm run dev
   ```

4. Open the link shown in the terminal (usually http://localhost:5173).

## How to Use

1. Click on Register and make an account.
2. After registering you get logged in and taken to the dashboard.
3. Add a task using the form. Click on a task to mark it as complete. Click Delete to remove it.

## Folder Structure

```
backend   - the server, database models and API routes
frontend  - the React app (the user interface)
```

## Notes

- Make sure MongoDB is running before you start the backend.
- The backend runs on port 5000 and the frontend on port 5173.
- The login uses a JWT token which is saved in the browser's localStorage.
