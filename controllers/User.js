const User = require('../models/User')
const { jwt } = require('../helpers')
const { checkPassword } = require('../helpers/bcrypt')
const { query } = require('express')

module.exports = class {
    static register = async (req, res, next) => {
        try {
            const { email, password, name } = req.body
            const user = { email, password, name }
            const registeredUser = await User.create(user)
            if (!registeredUser) {
                throw new Error(
                    'Something went wrong when register your email!'
                )
            } else {
                res.status(201).json({
                    title: 'Success!',
                    message: 'Register success',
                })
            }
        } catch (error) {
            next(error)
        }
    }

    static login = async (req, res, next) => {
        try {
            const { email, password } = req.body
            const user = await User.findOne({
                email,
            }).select('+password')
            if (!user) throw new Error('User not registered')

            const validatePassword = await checkPassword(
                password,
                user.password
            )
            if (!validatePassword) {
                // console.log("masuk sini validate false");
                throw new Error(
                    'Oops... that seems to be the wrong password. Hit it again!'
                )
            }
            user.password = ''
            const token = await jwt.generateToken({
                _id: user._id,
                email: user.email,
            })
            //  delete user._doc.password
            res.status(200).json({ token, user })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}
