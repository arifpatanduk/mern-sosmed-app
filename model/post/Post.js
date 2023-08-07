const mongoose = require('mongoose')

// post schema
const postSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: [true, 'Post title is required'],
        trim: true,
    },
    category: {
        type: String,
        required: [true, 'Post category is required'],
        default: 'All'
    },
    isLiked: {
        type: Boolean,
        default: false
    },
    isDisliked: {
        type: Boolean,
        default: false
    },
    likes: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    ],
    dislikes: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    ],
    numViews: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Author is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    image: {
        type: String,
        default: 'https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png'
    }

}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
    timestamps: true
})

// compile
const Post = mongoose.model('Post', postSchema)

module.exports = Post