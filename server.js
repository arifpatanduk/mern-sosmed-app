const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const dbConnect = require("./config/db/dbConnect")
const userRoutes = require("./routes/users/userRoute")
const authRoutes = require("./routes/auth/authRoute")
const {errorHandler, notFound} = require("./middlewares/error/errorHandler")
const app = express()

// db
dbConnect()

// middleware
app.use(express.json())

// ROUTES
// auth routes
app.use("/api/auth", authRoutes)

// user routes
app.use("/api/users", userRoutes)



// error handler
app.use(notFound)
app.use(errorHandler)

// server
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server is running on port ${PORT}`))