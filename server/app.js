const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const authRoutes = require('./routes/auth')
const noteRoutes = require('./routes/notes')

const app = express()

app.use(cors())
app.use(express.json())

// connect to database before handling requests
app.use(async (req, res, next) => {
  await connectDB()
  next()
})

app.get('/', (req, res) => {
  res.send('API is running')
})

app.use('/api/auth', authRoutes)
app.use('/api/notes', noteRoutes)

module.exports = app;
