const { Chat } = require('../modules/chat')

exports.getChats = async (req, res) => {
    try{
        const id = req.params.id
        var data = await Chat.find({roomId: id})
        
        return res.status(200).json({
            "isSuccess": true,
            "message": "Chats fetched successfully!",
            "data": data,
            "status":200
        })
    }
    catch(err){
        console.log(err)

        return res.status(500).json({
            "isSuccess": false,
            "message": "Internal Server Error",
            "data": "",
            "status":500
        })
    }
}

exports.addChat = async (req, res) => {
    try{
        const {roomId, message, from} = req.body

        const chat = new Chat()
        chat.roomId = roomId;
        chat.message = message;
        chat.from = from

        const savedChat = await chat.save()

        return res.status(200).json({
            "isSuccess": true,
            "message": "Message added successfully",
            "data": savedChat,
            "status":200
        })
    }
    catch(err){
        console.log(err)

        return res.status(500).json({
            "isSuccess": false,
            "message": "Internal Server Error",
            "data": "",
            "status":500
        })
    }
}