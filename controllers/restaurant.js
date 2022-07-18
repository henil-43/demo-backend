const multer = require('multer')
const fs = require('fs')
const { Restaurant } = require('../modules/restaurant')


exports.createRestaurant = async (req, res) => {
    try{
        const {name, phone, email, startTime, endTime, isActive} = req.body

        let restaurant = new Restaurant()
        restaurant.name = name
        restaurant.phone = phone
        restaurant.email = email
        restaurant.image = req.file?req.file.path:undefined
        restaurant.startTime = startTime
        restaurant.endTime = endTime
        restaurant.isActive = isActive

        let savedRestaurant = await restaurant.save()

        return res.status(200).json({
            "isSuccess": true,
            "message": "Restaurant added successfully!",
            "data": savedRestaurant,
            "status": 200
        })
    
    }
    catch(err){

        return res.status(500).json({
            "isSuccess": false,
            "message": "Internal server error",
            "data": "",
            "status":500
        })
    }
    
}

exports.getAllRestaurants = async (req, res) => {
    try{

        var {page, size, search, sortBy} = req.query
        let query = {}

        if(search && search != "" && search != undefined){
            query = {
                ...query,
                name: new RegExp(search)
            }
        }
        if(!page){
            page = 1
        }
        if(!size){
            size = 5
        }
        let sort = {}

        if(sortBy && sortBy != ""){
            if(sortBy == 'asc'){
                sort = {createdAt: "asc"}
            }
            else if(sortBy == 'nameASC'){
                sort = {name: "asc"}
            }
            else if(sortBy == 'nameDESC'){
                sort = {name: "desc"}
            }
        }
        else{
            sort = {createdAt: "desc"}
        }
        
        const restaurantData = await Restaurant.find(query).limit(parseInt(size)).skip((parseInt(page) - 1)*parseInt(size)).sort(sort)

        const tempData = await Restaurant.find(query)

        return res.status(200).json({
            "isSuccess": true,
            "message": "Data found successfully!",
            "meta": {
                pageSize: parseInt(size),
                currentPage: parseInt(page),
                totalPages: Math.ceil((tempData.length/size)),
                totalDataCount: tempData.length
            },
            "data": restaurantData,
            "status": 200
        })


    }
    catch(err){
        
        return res.status(500).json({
            "isSuccess": false,
            "message": "Internal server error!",
            "data": "",
            "status": 500
        })
    }
}

exports.updateRestaurant = async (req, res) => {
    try{
        const restaurantId = req.params.id;
        const {name, phone, email, startTime, endTime} = req.body
        const image = req.file?req.file.path:""

        var restaurantData = await Restaurant.findById(restaurantId)
        if(restaurantData){
            if(name != "" && name != undefined){
                restaurantData.name = name
            }
            if(phone != "" && phone != undefined){
                restaurantData.phone = phone
            }
            if(email != "" && email != undefined){
                restaurantData.email = email
            }
            if(image != "" && image != undefined){
                if(restaurantData.image && restaurantData.image != undefined && restaurantData.image != "" && restaurantData != null){
                    fs.unlinkSync(__dirname + '/../' + restaurantData.image)
                }
        
                restaurantData.image = image
            }
            if(startTime != "" && startTime != undefined){
                restaurantData.startTime = startTime
            }
            if(endTime != "" && endTime != undefined){
                restaurantData.endTime = endTime
            }
    
            const newRestaurantData = await restaurantData.save()
    
            return res.status(200).json({
                "isSuccess": true,
                "message": "Restaurant updated successfully!",
                "data": newRestaurantData,
                "status": 200
            })
        }
        else{
            return res.status(404).json({
                "isSuccess": false,
                "message": "Couldn't find restaurant to update!",
                "data": "",
                "status": 404
            })
        }
        
    }
    catch(err){

        return res.status(500).json({
            "isSuccess": false,
            "message": "Internal server error!",
            "data": "",
            "status": 500
        })
    }

}

exports.toggleActiveStatus = async (req, res) => {
    try{
        const restaurantId = req.params.id
        const { isActive } = req.body
        const restaurantData = await Restaurant.findById(restaurantId)
        
        if(restaurantData){

            if(isActive != undefined && isActive != null){
                restaurantData.isActive = isActive
            }
            
            const newRestaurantData = await restaurantData.save()
    
            return res.status(200).json({
                "isSuccess": true,
                "message": "Restaurant updated successfully!",
                "data": newRestaurantData,
                "status": 200
            })
        }
        else{
            return res.status(404).json({
                "isSuccess": false,
                "message": "Couldn't find restaurant to update!",
                "data": "",
                "status": 404
            })
        }
        

    }
    catch(err){

        return res.status(500).json({
            "isSuccess": false,
            "message": "Internal server error!",
            "data": "",
            "status": 500
        })
    }
}

exports.deleteRestaurant = async (req, res) => {
    try{
        const restaurantId = req.params.id;

        const data = await Restaurant.findByIdAndDelete(restaurantId)

        if (data == {} || data == null){
            return res.status(404).json({
                "isSuccess": false,
                "message": "Couldn't find restaurant data to delete!",
                "data": "",
                "status": 404
            })    
        }
        else{
            
            fs.unlinkSync(__dirname + '/../' + data.image)

            return res.status(200).json({
                "isSuccess": true,
                "message": "Restaurant deleted successfully!",
                "data": "",
                "status": 200
            })
        }
    }
    catch(err){

        return res.status(500).json({
            "isSuccess": false,
            "message": "Internal server error!",
            "data": "",
            "status": 500
        })
    }
}