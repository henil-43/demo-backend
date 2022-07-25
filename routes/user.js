const express= require('express')
const router = express.Router()

const {login, signup, getAllUsers, getUserById, updateUser, deleteUser, toggleActiveStatus} = require('../controllers/user')
const { isAuthenticated } = require('../middlewares/middleware')

router.post('/signup', signup)

router.post('/login', login)

router.get('/get-users/', isAuthenticated, getAllUsers)

router.get('/get-user/:id', isAuthenticated, getUserById)

router.put('/update-user/:id', isAuthenticated, updateUser)

router.put('/toggle-status/:id', isAuthenticated, toggleActiveStatus)

router.delete('/delete-user/:id', isAuthenticated, deleteUser)


module.exports = router