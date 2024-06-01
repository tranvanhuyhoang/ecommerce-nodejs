"use strict"

class KeyTokenService {
  static createKeyToken = async ({ user, publicKey }) => {
    try {
      const publicKeyString = publicKey.toString()
      const tokens = await keyTokenModel.create({
        user,
        publicKey: publicKeyString,
      })

      return tokens ? publicKeyString : null
    } catch (error) {
      return {
        code: "500",
        message: "Server error",
      }
    }
  }
}

module.exports = KeyTokenService
