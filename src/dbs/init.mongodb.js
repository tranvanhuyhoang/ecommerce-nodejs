"use strict"

const mongoose = require("mongoose")
const {
  db: { host, port, name },
} = require("../configs/config.mongodb")
const connectString = `mongodb://${host}:${port}/${name}`

class Database {
  constructor() {
    this.connect()
  }

  connect(type = "mongodb") {
    if (1 === 1) {
      // moi truong dev
      mongoose.set("debug", true)
      mongoose.set("debug", { color: true })
    }
    mongoose
      .connect(connectString)
      .then((_) => console.log("CONNECT DB SUCCESS PRO"))
      .catch((err) => console.log("Err connect"))
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }
}

const instanceMongodb = Database.getInstance()
module.exports = instanceMongodb
