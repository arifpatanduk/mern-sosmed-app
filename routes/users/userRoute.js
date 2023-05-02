const express = require('express');
const { 
    userRegisterCtrl, 
    userLoginCtrl, 
    fetchUsersCtrl, 
    deleteUserCtrl, 
    userDetailCtrl,
    userProfileCtrl,
    userUpdateProfileCtrl,
    userUpdatePasswordCtrl,
    userFollowingCtrl
} = require('../../controllers/users/UserController');
const authMiddleware = require('../../middlewares/auth/authMiddleware');

const userRoutes = express.Router()

// register
userRoutes.post("/register", userRegisterCtrl)

// login
userRoutes.post("/login", userLoginCtrl)

// users
userRoutes.get("/", authMiddleware, fetchUsersCtrl) // with middleware
userRoutes.delete("/:id", deleteUserCtrl)
userRoutes.get("/:id", userDetailCtrl) // user detail

// user profile
userRoutes.get("/profile/:id", authMiddleware, userProfileCtrl) 
userRoutes.put("/update/:id", authMiddleware, userUpdateProfileCtrl)
userRoutes.put("/password", authMiddleware, userUpdatePasswordCtrl)

// following
userRoutes.put("/follow", authMiddleware, userFollowingCtrl)


module.exports = userRoutes