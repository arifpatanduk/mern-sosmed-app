const User = require("../../model/user/User")

// REGISTER
const userRegisterCtrl = async (req, res) => {
    
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

}

module.exports = {userRegisterCtrl}