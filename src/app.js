require('dotenv').config();
const express = require('express')

const app = express();

const port = process.env.PORT;

const dbConnection = require('./config/db')
const morgan = require('morgan')
const cors = require('cors')

dbConnection();

// Middleware

// cors == cross origin resource sharing
// using this middleware (cors) , we can share cross platform at once like frontend and backend server at once
// app.use(cors({
//   origin : "attache_frontend_link_here"
// }))

app.use(morgan('dev'))
app.use(express.urlencoded())
app.use(express.json())

// Routes

app.use('/api',require('./routes/index.routes'))

// Server start

app.listen(port , (err) => {
  err ? console.log(err) : console.log(`server is running on http://localhost:${port}`)
})