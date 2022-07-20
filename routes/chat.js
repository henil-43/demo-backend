var express = require('express')
const router = express.Router()
const {addChat, getChats} = require('../controllers/chat')

router.get('/chats/:id', getChats);

router.post('/chat', addChat);

module.exports = router
