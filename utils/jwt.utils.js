const jwt = require('jsonwebtoken')

exports.jwtGenerator = async (payload) => {
    return jwt.sign(payload, process.env.AUTH_SECRET, {expiresIn: process.env.EXPIRE_TIME})
}