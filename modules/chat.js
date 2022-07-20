const mongoose = require('mongoose')

var ChatSchema = mongoose.Schema({
    roomName: {
        type: String
    },
    roomId: {
        type: String
    },
    message: {
        type: String
    },
    from: {
        type: String
    }

},{timestamps: true});

var Chat = mongoose.model('chats', ChatSchema)
module.exports = { Chat }
