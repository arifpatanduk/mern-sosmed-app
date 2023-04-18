const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const dbConnect = require("./config/db/dbConnect")
const { userRegisterCtrl } = require("./controllers/users/UserController")
const app = express()

// db
dbConnect()

// middleware
app.use(express.json())

app.post("/api/users/register", userRegisterCtrl)

app.post("/api/users/login", (req, res)=>{
    res.json({user: "User Login"})
})

app.get("/api/users", (req, res)=>{
    res.json({user: "fetch all users"})
})

// server
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server is running on port ${PORT}`))