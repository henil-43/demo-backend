const mongoose = require('mongoose')
//const { ObjectId } = mongoose.Schema

const userSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    hash: {
        type: String,
    },
    salt: {
        type: String
    }
}, {timestamps: true})

var User = mongoose.model("users", userSchema)
module.exports = { User }