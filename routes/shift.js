const express = require('express')
const router = express.Router()

const {createShift, getAllShifts} = require('../controllers/shift')
const {isAuthenticated} = require('../middlewares/middleware')

router.post('/create-shift', isAuthenticated, createShift)

router.get('/get-all-shifts', isAuthenticated, getAllShifts)


module.exports = router