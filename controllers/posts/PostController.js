const expressAsyncHandler = require("express-async-handler")
const Post = require("../../model/post/Post")
const validateMongodbId = require("../../utils/validateMongoDBId")

// create
const createPostCtrl = expressAsyncHandler(async (req, res) => {
    
    // validate user id by token attached
    const { _id } = req.user
    validateMongodbId(_id)

    // append user to request body
    req.body.user = _id

    try {
        const post = await Post.create(req.body)
        res.json(post)
    } catch (error) {
        res.json(error)
    }
    
})


module.exports = {
    createPostCtrl
}