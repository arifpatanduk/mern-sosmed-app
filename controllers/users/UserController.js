const generateToken = require("../../config/token/generateToken")
const User = require("../../model/user/User")
const expressAsyncHandler = require("express-async-handler")

// REGISTER
const userRegisterCtrl = expressAsyncHandler(async (req, res) => {
    const { email } = req.body
    
    // check if the user is already registered
    const userExists = await User.findOne({email})

    if (userExists) throw new Error("User already registered")
    
    try {
        // register user
        const user = await User.create({
            firstName: req?.body?.firstName,
            lastName: req?.body?.lastName,
            email: req?.body?.email,
            password: req?.body?.password,
        })
        res.json(user)
    } catch (error) {
        res.json(error)
    }

})


// LOGIN
const userLoginCtrl = expressAsyncHandler(async (req, res) => {

    const { email, password } = req.body

    // check if user exists
    const user = await User.findOne({ email })
    
    // check if password is matched
    if (user && await user.isPasswordMatched(password)) {
        res.json({
            _id: user?._id,
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email,
            profilePhoto: user?.profilePhoto,
            isAdmin: user?.isAdmin,
            token: generateToken(user?._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid Login Credentials')
    }
})


// USERS
// fetch all users
const fetchUsersCtrl = expressAsyncHandler(async (req, res) => {
    try {
        const users = await User.find({})
        res.json(users)
    } catch (error) {
        res.json(error)
    }
})

module.exports = {userRegisterCtrl, userLoginCtrl, fetchUsersCtrl}