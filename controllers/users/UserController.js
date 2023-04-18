const User = require("../../model/user/User")
const expressAsyncHandler = require("express-async-handler")

// REGISTER
const userRegisterCtrl = expressAsyncHandler(async (req, res) => {

    // check if the user is already registered
    const userExists = await User.find({email: req?.body?.email})

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

module.exports = {userRegisterCtrl}