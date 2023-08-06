const generateToken = require("../../config/token/generateToken")
const User = require("../../model/user/User")
const expressAsyncHandler = require("express-async-handler")
const validateMongodbId = require("../../utils/validateMongoDBId")
const sendEmail = require("../../utils/sendEmail")
const crypto = require('crypto')


// USERS

// user details
const userDetailCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongodbId(id)
    try {
        const user = await User.findById(id)
        res.json(user)
    } catch (error) {
        res.json(error)
    }
})

// fetch all users
const fetchUsersCtrl = expressAsyncHandler(async (req, res) => {
    try {
        const users = await User.find({})
        res.json(users)
    } catch (error) {
        res.json(error)
    }
})

// delete user
const deleteUserCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongodbId(id)

    try {
        const user = await User.findByIdAndDelete(id)
        res.json(user)
    } catch (error) {
        res.json(error)
    }
})

// USER PROFILE
// show user profile
const userProfileCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongodbId(id)
    try {
        const user = await User.findById(id)
        res.json(user)
    } catch (error) {
        res.json(error)
    }
})

// update user profile
const userUpdateProfileCtrl = expressAsyncHandler(async (req, res) => {
    const { _id } = req?.user
    validateMongodbId(_id)

    const user = await User.findByIdAndUpdate(_id, {
        firstName: req?.body?.firstName,
        lastName: req?.body?.lastName,
        email: req?.body?.email,
        bio: req?.body?.bio
    }, {
        new: true,
        runValidators: true
    })

    res.json(user)
})

// update user password
const userUpdatePasswordCtrl = expressAsyncHandler(async (req, res) => {
    const { _id } = req?.user
    const { password } = req?.body
    validateMongodbId(_id)

    const user = await User.findById(_id)

    if (password) {
        user.password = password
        const updatedUser = await user.save()
        res.json(updatedUser)
    }
    
    res.json(user)
})


// FOLLOWING
// follow
const userFollowingCtrl = expressAsyncHandler(async (req, res) => {
    const { followId } = req?.body
    const loginUserId = req?.user.id

    // validate followId
    validateMongodbId(followId)
    const targetUser = await User.findById(followId)

    const alreadyFollowing = targetUser?.followers?.find(
        follower => follower?.toString() === loginUserId.toString()
    )

    if (alreadyFollowing) throw new Error(`You already followed ${targetUser?.firstName} ${targetUser?.lastName}`)
    
    // update follower in target user
    await User.findByIdAndUpdate(followId, {
        $push: {followers: loginUserId},
        isFollowing: true
    }, { new: true })
    
    // update following in current user
    await User.findByIdAndUpdate(loginUserId, {
        $push: {following: followId}
    }, { new: true })

    res.json(`You have successfully followed ${targetUser?.firstName} ${targetUser?.lastName}`)
})


// unfollow
const userUnfollowingCtrl = expressAsyncHandler(async (req, res) => {
    const { unfollowId } = req?.body
    const loginUserId = req?.user.id

    // validate followId
    validateMongodbId(unfollowId)
    const targetUser = await User.findById(unfollowId)

    const alreadyFollowing = targetUser?.followers?.find(
        follower => follower?.toString() === loginUserId.toString()
    )

    if (!alreadyFollowing) throw new Error(`You not following ${targetUser?.firstName} ${targetUser?.lastName}`)

    // remove follower in target user
    await User.findByIdAndUpdate(unfollowId, {
        $pull: {followers: loginUserId},
        isFollowing: false
    }, { new: true })
    
    // remove following in current user
    await User.findByIdAndUpdate(loginUserId, {
        $pull: {following: unfollowId}
    }, { new: true })

    res.json(`You have successfully unfollow ${targetUser?.firstName} ${targetUser?.lastName}`)
})


// BLOCK USER
// block
const userBlockCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req?.params
    validateMongodbId(id)

    const user = await User.findByIdAndUpdate(id, {
        isBlocked: true
    }, { new: true })

    res.json(user)
})

// unblock
const userUnblockCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req?.params
    validateMongodbId(id)

    const user = await User.findByIdAndUpdate(id, {
        isBlocked: false
    }, { new: true })

    res.json(user)
})

module.exports = {
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
}