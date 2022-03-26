require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const routes = require('./routes')
const mongoose = require('mongoose')
const app = express()

console.log('==================START PROJECT====================')

mongoose
    .connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('mongo has connected')
    })
    .catch((err) => {
        console.log('error in mongo connection')
        console.log(err)
    })

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', routes)

module.exports = app
