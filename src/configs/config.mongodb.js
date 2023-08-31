'use strict'
const dev = {
    app: {
        port: process.env.PORT || 4000
    },
    db: {
        host: process.env.DEV_DB_HOST || 'localhost',
        port: process.env.DEV_DB_PORT || 27017,
        name: process.env.DEV_DB_NAME || 'dev-ecommerce-shop'
    }
}

const production = {
    app: {
        port: process.env.PORT || 4000
    },
    db: {
        host: process.env.PRO_DB_HOST || 'localhost',
        port: process.env.PRO_DB_PORT || 27017,
        name: process.env.PRO_DB_NAME || 'ecommerce-shop'
    }
}

const config = {dev, production}
const env = process.env.NODE_ENV || 'dev'
module.exports = config[env]