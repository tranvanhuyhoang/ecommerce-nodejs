"use strict"

const apiKeyModel = require("../models/apiKey.model")
const crypto = require("crypto")

const findById = async (key) => {
  // const newKey = await apiKeyModel.create({
  //   key: crypto.randomBytes(64).toString("hex"),
  //   status: true,
  //   permissions: ["0000"],
  // })
  // console.log("newKey ", newKey)
  const objKey = await keyTokenModel.findOne({ key, status: true }).lean()
  return objKey
}

module.exports = {
  findById,
}
