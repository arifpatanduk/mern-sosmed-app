const express = require('express');
const { userRegisterCtrl, userLoginCtrl, fetchUsersCtrl, deleteUserCtrl, userDetailCtrl } = require('../../controllers/users/UserController');
const authMiddleware = require('../../middlewares/auth/authMiddleware');

const userRoutes = express.Router()

// register
userRoutes.post("/register", userRegisterCtrl)

// login
userRoutes.post("/login", userLoginCtrl)

// users
userRoutes.get("/", authMiddleware, fetchUsersCtrl) // with middleware
userRoutes.delete("/:id", deleteUserCtrl)
userRoutes.get("/:id", userDetailCtrl)

module.exports = userRoutes