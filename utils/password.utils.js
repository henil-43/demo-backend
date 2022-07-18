var crypto = require('crypto')

exports.generatepassword = async (password) => {

    const randomBytes = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv(process.env.ALGORITHM, process.env.AUTH_SECRET, randomBytes)
    return {
        hash : randomBytes.toString('hex'),
        salt : Buffer.concat([cipher.update(password), cipher.final()]).toString('hex')    
    }
}

exports.validatepassword = async (password, hash, salt) => {
    const decipher = crypto.createDecipheriv(process.env.ALGORITHM, process.env.AUTH_SECRET, Buffer.from(hash, 'hex'))
    const decryptedPassword = Buffer.concat([decipher.update(Buffer.from(salt, 'hex')), decipher.final()])

    return password === decryptedPassword.toString()
}