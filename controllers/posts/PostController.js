const expressAsyncHandler = require("express-async-handler")
const Post = require("../../model/post/Post")
const validateMongodbId = require("../../utils/validateMongoDBId")
const BadWordsFilter = require("bad-words")
const User = require("../../model/user/User")

// create
const createPostCtrl = expressAsyncHandler(async (req, res) => {
    
    // validate user id by token attached
    const { _id } = req.user
    validateMongodbId(_id)

    // append user to request body
    req.body.user = _id

    // check for bad words in title and description
    const filter = new BadWordsFilter()
    const isTitleProfane = filter.isProfane(req.body.title)
    const isDescProfane = filter.isProfane(req.body.description)
    
    // block user if isProfane
    if (isTitleProfane || isDescProfane) {
        await User.findByIdAndUpdate(_id, {
            isBlocked: true
        })
        throw new Error('Creating post failed because its contains profane words. You have been blocked!')
    }

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