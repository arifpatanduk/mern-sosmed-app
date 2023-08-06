const express = require('express');
const { 
    fetchUsersCtrl, 
    deleteUserCtrl, 
    userDetailCtrl,
    userProfileCtrl,
    userUpdateProfileCtrl,
    userUpdatePasswordCtrl,
    userFollowingCtrl,
    userUnfollowingCtrl,
    userBlockCtrl,
    userUnblockCtrl
} = require('../../controllers/users/UserController');

const authMiddleware = require('../../middlewares/auth/authMiddleware');

const userRoutes = express.Router()

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
userRoutes.put("/unfollow", authMiddleware, userUnfollowingCtrl)

// block
userRoutes.put("/block/:id", authMiddleware, userBlockCtrl)
userRoutes.put("/unblock/:id", authMiddleware, userUnblockCtrl)

module.exports = userRoutes