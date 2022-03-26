const express = require('express')
const router = express.Router()
const errorHandler = require('../middlewares/errorHandler')
const auth = require('../middlewares/auth')

// router.get('/', )
router.use('/users', require('./users'))

router.use(auth)
router.use('/movies', require('./movies'))
router.use('/orders', require('./orders'))
router.use(errorHandler)

module.exports = router
