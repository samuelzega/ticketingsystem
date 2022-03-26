const { pagingHandler } = require('../helpers')
const Movie = require('../models/Movie')

module.exports = class {
    static getAll = async (req, res, next) => {
        try {
            const pagingOption = pagingHandler(req.query)
            const allMovie = await Movie.paginate({}, pagingOption)
            res.status(200).json(allMovie)
        } catch (error) {
            next(error)
        }
    }

    static add = async (req, res, next) => {
        try {
            console.log(' masuk sini =======')
            const newMovie = await Movie.create({
                ...req.body,
            })
            if (!newMovie) {
                throw new Error('Something went wrong when add new movie!')
            } else {
                res.status(201).json({
                    title: 'Success!',
                    message: 'add new movie success',
                    newMovie,
                })
            }
        } catch (error) {
            next(error)
        }
    }

    static insertMany = async (req, res, next) => {
        try {
            console.log(req.body)
            const newMovie = await Movie.insertMany(req.body)
            if (!newMovie) {
                throw new Error('Something went wrong when add new movie!')
            } else {
                res.status(201).json({
                    title: 'Success!',
                    message: 'add new movie success',
                    newMovie,
                })
            }
        } catch (error) {
            next(error)
        }
    }

    static edit = async (req, res, next) => {
        try {
            const newMovie = await Movie.findOneAndUpdate(
                {
                    _id: req.query.movie,
                },
                req.body,
                {
                    new: true,
                }
            )
            if (!newMovie) {
                throw new Error(
                    'Something went wrong when edit movie!, movie not found'
                )
            } else {
                res.status(201).json({
                    title: 'Success!',
                    message: 'edit movie success',
                    newMovie,
                })
            }
        } catch (error) {
            next(error)
        }
    }
}
