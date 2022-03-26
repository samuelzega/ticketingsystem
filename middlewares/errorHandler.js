'use strict'

const { errorHandling } = require('../helpers')

module.exports = function (err, req, res, next) {
   const errorToSend = errorHandling(err)

   // console.log(errorToSend)
   res.status(errorToSend.statusCode).json(errorToSend)
}
