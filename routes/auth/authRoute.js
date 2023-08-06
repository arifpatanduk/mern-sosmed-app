const express = require('express');

const { 
    userRegisterCtrl, 
    generateVerificationTokenCtrl,
    accountVerification,
    forgetPasswordToken,
    passwordResetCtrl,
    userLoginCtrl
} = require('../../controllers/auth/AuthController');

const authMiddleware = require('../../middlewares/auth/authMiddleware');
const authRoutes = express.Router()

// register
authRoutes.post("/register", userRegisterCtrl)

// account verification
authRoutes.post("/generate-verify-email-token", authMiddleware, generateVerificationTokenCtrl)
authRoutes.put("/verify-account", authMiddleware, accountVerification)

// forget password
authRoutes.post("/forget-password-token", forgetPasswordToken)
authRoutes.put("/reset-password", passwordResetCtrl)

// login
authRoutes.post("/login", userLoginCtrl)

module.exports = authRoutes