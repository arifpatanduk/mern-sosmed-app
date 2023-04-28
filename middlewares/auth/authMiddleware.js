const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../../model/user/User");

const authMiddleware = expressAsyncHandler(async (req, res, next) => {
    let token

    if (req?.headers?.authorization?.startsWith('Bearer')) {
        try {
            token = req?.headers?.authorization.split(' ')[1] // authorization come with 'Bearer blablabla'

            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_KEY)

                // find user by id
                const user = await User.findById(decoded?.id).select('-password') // exclude password

                req.user = user
                next()
            }
            else {
                throw new Error('There is no token attached to the headers')
            }
        } catch (error) {
            throw new Error(error)
        }
    } 
})

module.exports = authMiddleware