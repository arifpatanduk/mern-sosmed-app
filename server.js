const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const dbConnect = require("./config/db/dbConnect")
const userRoutes = require("./routes/users/userRoute")
const app = express()

// db
dbConnect()

// middleware
app.use(express.json())

// ROUTES
// user routes
app.use("/api/users", userRoutes)

// server
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server is running on port ${PORT}`))