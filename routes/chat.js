var express = require('express')
const router = express.Router()
const {addChat, getChats} = require('../controllers/chat')
const { isAuthenticated } = require('../middlewares/middleware')

router.get('/chats/:id', isAuthenticated, getChats);

router.post('/chat', isAuthenticated, addChat);

module.exports = router
