const mongoose = require('mongoose')

const restaurantSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone:{
        type: Number
    },
    email: {
        type: String
    },
    image:{
        type: String
    },
    startTime:{
        type: String
    },
    endTime:{
        type: String
    },
    isActive: {
        type: Boolean,
        default: false
    }

}, {timestamps: true})

var Restaurant = mongoose.model('restaurants', restaurantSchema)
module.exports = { Restaurant }