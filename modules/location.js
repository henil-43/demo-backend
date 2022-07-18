const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const locationSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    restaurantId:{
        type: ObjectId,
        ref: 'restaurant',
    },
    address: {
        firstLine: {
            type: String
        },
        secondLine: {
            type: String
        }
    },
    coordinates:{
        latitude: {
            type: String
        },
        longitude: {
            type: String
        }
    },
    pincode: {
        type: Number
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    country: {
        type: String
    }

}, {timestamps: true})

var Location = mongoose.model('locations', locationSchema)
module.exports = { Location }
