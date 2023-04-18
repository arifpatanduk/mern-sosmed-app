const express = require('express');
const { userRegisterCtrl, userLoginCtrl } = require('../../controllers/users/UserController');

const userRoutes = express.Router()

// register
userRoutes.post("/register", userRegisterCtrl)
userRoutes.post("/login", userLoginCtrl)

module.exports = userRoutes