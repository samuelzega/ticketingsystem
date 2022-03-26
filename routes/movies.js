const express = require('express')
const router = express.Router()
const Movie = require('../controllers/Movie')

router.post('/', Movie.add)
router.get('/', Movie.getAll)
router.patch('/', Movie.edit)
router.post('/insertMany', Movie.insertMany)

module.exports = router
