const express = require('express');
const { userRegisterCtrl, userLoginCtrl, fetchUsersCtrl, deleteUserCtrl, userDetailCtrl } = require('../../controllers/users/UserController');

const userRoutes = express.Router()

// register
userRoutes.post("/register", userRegisterCtrl)

// login
userRoutes.post("/login", userLoginCtrl)

// users
userRoutes.get("/", fetchUsersCtrl)
userRoutes.delete("/:id", deleteUserCtrl)
userRoutes.get("/:id", userDetailCtrl)

module.exports = userRoutes