const express = require('express')
const router = express.Router()
const User = require('../controllers/User')

router.post('/register', User.register)
router.post('/login', User.login)

module.exports = router
