'use strict'

const { jwt } = require('../helpers')
const userModel = require('../models/User')
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

const auth = async (req, res, next) => {
    try {
        const { authorization } = req.headers
        if (!authorization) throw new Error('Authentication Failed!')
        const token = authorization.slice(7)
        // temporary user process.env.APP_KEY, will improve later using custom logic to auto-generate http header authorization if necessary
        const user = jwt.verifyToken(token)
        if (typeof user === 'object') {
            const userData = await userModel.findOne({
                _id: ObjectId(user._id),
                email: user.email,
            })
            // .populate(["communityId"]);
            // console.log(userData);
            if (!userData) throw new Error('User not registered!')
            req.userLogin = userData
        }
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = auth
