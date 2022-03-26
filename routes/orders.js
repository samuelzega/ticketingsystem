const express = require('express')
const router = express.Router()
const Order = require('../controllers/Order')

router.post('/', Order.add)
router.post('/purchase', Order.purchase)

module.exports = router
