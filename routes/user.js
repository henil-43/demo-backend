const express= require('express')
const router = express.Router()

const {login, signup, getAllUsers, getUserById, updateUser, deleteUser} = require('../controllers/user')
const { isAuthenticated } = require('../middlewares/middleware')

router.post('/signup', signup)

router.post('/login', login)

router.get('/get-users/', getAllUsers)

router.get('/get-user/:id', getUserById)

router.put('/update-user/:id', updateUser)

router.delete('/delete-user/:id', deleteUser)

module.exports = router