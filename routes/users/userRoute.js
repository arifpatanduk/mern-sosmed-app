const express = require('express');
const { userRegisterCtrl, userLoginCtrl, fetchUsersCtrl } = require('../../controllers/users/UserController');

const userRoutes = express.Router()

// register
userRoutes.post("/register", userRegisterCtrl)

// login
userRoutes.post("/login", userLoginCtrl)

// users
userRoutes.get("/", fetchUsersCtrl)

module.exports = userRoutes