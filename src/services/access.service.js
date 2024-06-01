"use strict"

const shopModel = require("../models/shop.model")
const keyTokenModel = require("../models/keyToken.model")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const KeyTokenService = require("./keyToken.service")

const RoleShop = {
  ADMIN: "admin",
  SHOP: "shop",
  EDITOR: "editor",
}

class AccessService {
  static signUp = async ({ name, email, password }) => {
    try {
      const holderShop = await shopModel.findOne({ email }).clean()
      if (holderShop) {
        return {
          code: "400",
          message: "Email already exists",
        }
      }

      const passwordHash = bcrypt.hash(password, 10)
      const newShop = await shopModel.create({
        name,
        email,
        password: passwordHash,
        roles: [RoleShop.SHOP],
      })

      if (newShop) {
        // created privateKey and publicKey
        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 4096,
        })

        console.log("privateKey", privateKey)
        console.log("publicKey", publicKey)

        const publicKeyString = await KeyTokenService.createKeyToken({
          user: newShop._id,
          publicKey,
        })
      }
    } catch (error) {
      return {
        code: "500",
        message: "Server error",
      }
    }
  }
}

module.exports = AccessService
