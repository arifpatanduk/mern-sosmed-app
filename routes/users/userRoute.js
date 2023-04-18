const express = require('express');
const { userRegisterCtrl } = require('../../controllers/users/UserController');

const userRoutes = express.Router()

// register
userRoutes.post("/register", userRegisterCtrl)

module.exports = userRoutes