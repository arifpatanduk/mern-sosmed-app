const express = require('express');
const { 
    userRegisterCtrl, 
    generateVerificationTokenCtrl,
    accountVerification,
    forgetPasswordToken,
    passwordResetCtrl,
    userLoginCtrl, 
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

// register
userRoutes.post("/register", userRegisterCtrl)

// account verification
userRoutes.post("/generate-verify-email-token", authMiddleware, generateVerificationTokenCtrl)
userRoutes.put("/verify-account", authMiddleware, accountVerification)

// forget password
userRoutes.post("/forget-password-token", forgetPasswordToken)
userRoutes.put("/reset-password", passwordResetCtrl)


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
userRoutes.put("/unfollow", authMiddleware, userUnfollowingCtrl)

// block
userRoutes.put("/block/:id", authMiddleware, userBlockCtrl)
userRoutes.put("/unblock/:id", authMiddleware, userUnblockCtrl)

module.exports = userRoutes