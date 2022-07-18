var mongoose = require('mongoose')
var { ObjectId } = mongoose.Schema


const shiftSchema = mongoose.Schema({
    name: {
        type: String,
    },
    restaurantId: {
        type: ObjectId,
        ref: 'restaurants',
        required: true
    },
    shiftDate: {
        type: Date
    },
    startDate:{
        type: Date
    },
    endDate: {
        type: Date
    },
    weekDays: {
        type: Array
    }
}, {timestamps: true})

var Shift = mongoose.model('shifts', shiftSchema)
module.exports = { Shift }