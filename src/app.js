require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const {default: helmet} = require('helmet')
const compression = require('compression')
const app = express()

//init middlewares
app.use(morgan("dev"))
app.use(helmet())
app.use(compression())

//init DB
require('./dbs/init.mongodb')
const {countConnect, checkOverload} = require('./helpers/check.connect')
countConnect()
checkOverload()

//init routes
app.use('/', require('./routes'))
//handle error


module.exports = app