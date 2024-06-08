require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const { default: helmet } = require("helmet")
const compression = require("compression")
const app = express()

//init middlewares
// morgan in ra các log khi 1 người dùng chạy 1 request ví dụ: GET / 500 2.738 ms - 31
// dev: mode dùng cho dev
// common: mode dùng cho production
app.use(morgan("dev"))

// helmet
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//init DB
require("./dbs/init.mongodb")
const { countConnect, checkOverload } = require("./helpers/check.connect")
countConnect()
checkOverload()

//init routes
app.use("/", require("./routes"))
//handle error

module.exports = app
