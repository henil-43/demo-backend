const { Chat } = require('../modules/chat')

exports.getChats = async (req, res) => {
    try{
        const id = req.params.id
        var data = await Chat.findById()
        
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