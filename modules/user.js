const mongoose = require('mongoose')
//const { ObjectId } = mongoose.Schema

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    phoneNo: {
        type: Number
    },
    hash: {
        type: String,
    },
    age: {
        type: Number,
    },
    salt: {
        type: String
    },
    status: {
        type: Boolean
    }
}, {timestamps: true})

var User = mongoose.model("users", userSchema)
module.exports = { User }