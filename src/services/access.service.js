"use strict"

const shopModel = require("../models/shop.model")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const KeyTokenService = require("./keyToken.service")
const { createTokenPair } = require("../auth/authUtils")
const { format } = require("path")
const { getInfoData } = require("../utils")

const RoleShop = {
  ADMIN: "admin",
  SHOP: "shop",
  EDITOR: "editor",
}

class AccessService {
  static signUp = async ({ name, email, password }) => {
    try {
      const holderShop = await shopModel.findOne({ email }).lean()
      if (holderShop) {
        return {
          code: "400",
          message: "Email already exists",
        }
      }

      const passwordHash = await bcrypt.hash(password, 10)
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
          publicKeyEncoding: {
            type: "pkcs1",
            format: "pem",
          },
          privateKeyEncoding: {
            type: "pkcs1",
            format: "pem",
          },
        })

        const publicKeyString = await KeyTokenService.createKeyToken({
          user: newShop._id,
          publicKey,
        })

        if (!publicKeyString) {
          return {
            code: "xxxx",
            message: "Error publicKeyString",
          }
        }

        const publicKeyObject = crypto.createPublicKey(publicKeyString)

        const token = await createTokenPair(
          { user: newShop._id, email },
          publicKeyString,
          privateKey
        )
        return {
          code: "201",
          metadata: {
            shop: getInfoData({
              fields: ["_id", "name", "email"],
              object: newShop,
            }),
            token,
          },
          message: "Success",
        }
      }

      return {
        code: "200",
        medatada: null,
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
