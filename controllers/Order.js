const { pagingHandler } = require('../helpers')
const Order = require('../models/Order')

module.exports = class {
    static add = async (req, res, next) => {
        try {
            const newOrder = await Order.create({
                ...req.body,
                owner: req.userLogin._id,
            })
            if (!newOrder) {
                throw new Error('Something went wrong when add new pets!')
            } else {
                res.status(201).json({
                    title: 'Success!',
                    message: 'request new booking success',
                    data: newOrder,
                })
            }
        } catch (error) {
            next(error)
        }
    }
    static purchase = async (req, res, next) => {
        try {
            const status = req.body.paid ? 3 : 2
            const updatedOrder = await Order.findOneAndUpdate(
                {
                    _id: req.body.order,
                },
                {
                    status,
                },
                {
                    new: true,
                }
            )
            if (!updatedOrder) {
                throw new Error(
                    'Something went wrong when edit article!, article not found'
                )
            } else {
                res.status(201).json({
                    title: 'Success!',
                    message: 'edit article success',
                    updatedOrder,
                })
            }
        } catch (error) {
            next(error)
        }
    }
}
