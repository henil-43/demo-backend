const express = require('express')
const router = express.Router()

const {addLocation, getAllLocations, updateLocation, deleteLocation} = require('../controllers/location')

const {isAuthenticated} = require('../middlewares/middleware')

router.post('/add-location', isAuthenticated, addLocation)

router.get('/get-all-locations', isAuthenticated, getAllLocations)

router.put('/update-location/:id', isAuthenticated, updateLocation)

router.put('/delete-location/:id', isAuthenticated, deleteLocation)

module.exports = router