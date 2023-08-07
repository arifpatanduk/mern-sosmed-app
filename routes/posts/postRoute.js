const express = require('express');
const authMiddleware = require('../../middlewares/auth/authMiddleware');
const { createPostCtrl } = require('../../controllers/posts/PostController');

const postRoutes = express.Router()

// create
postRoutes.post("/", authMiddleware, createPostCtrl)

module.exports = postRoutes