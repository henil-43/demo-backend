const express = require('express')
const multer = require('multer')
const path = require('path')

const router = express.Router()

const {createRestaurant, getAllRestaurants, updateRestaurant, toggleActiveStatus, deleteRestaurant} = require('../controllers/restaurant')
const { isAuthenticated } = require('../middlewares/middleware')

        var storage = multer.diskStorage({
            destination: function(req, file, cb){
                cb(null, "uploads")
            },
            filename: function(req, file, cb){
                cb(null, file.fieldname + Date.now()+".png")
            }
        })

        var finalUpload = multer({
            storage: storage,
            fileFilter: function(req, file, cb){
                var fileTypes = /jpeg|jpg|png/;

                var mimetype  = fileTypes.test(file.mimetype)

                var extname = fileTypes.test(path.extname(file.originalname).toLowerCase())

                if(mimetype && extname){
                    return cb(null, true)
                }
                cb("Error: file upload only supports the following filetypes " + fileTypes)
            }
        })

router.post('/add-restaurant', isAuthenticated, finalUpload.single('file'),createRestaurant)

router.get('/get-all-restaurants', isAuthenticated, getAllRestaurants)

router.put('/update-restaurant/:id', isAuthenticated,finalUpload.single('file'), updateRestaurant)

router.put('/toggle-status/:id', isAuthenticated, toggleActiveStatus)

router.put('/delete-restaurant/:id', isAuthenticated, deleteRestaurant)

module.exports = router