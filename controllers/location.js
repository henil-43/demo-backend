const { Location } = require('../modules/location')

exports.addLocation = async (req, res) => {
    try{
        const {name, restaurantId, address, coordinates, pincode, city, country, state} = req.body;

        let location = new Location()
        location.name = name
        location.restaurantId = restaurantId
        location.address = address
        location.coordinates = coordinates
        location.pincode = pincode
        location.city = city
        location.state = state
        location.country = country

        let savedLocation = await location.save()

        return res.status(200).json({
            "isSuccess": true,
            "message": "Location added successfully!",
            "data": savedLocation,
            "status":200
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

exports.getAllLocations = async (req, res) => {
    try{
        var {page, size, search, sortBy, restaurantId} = req.query

        let query = {}

        if(restaurantId && restaurantId != ""){
            query = {
                ...query,
                restaurantId: restaurantId
            }
        }
        
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
            else if(sortBy == 'cityASC'){
                sort = {city: "asc"}
            }
            else if(sortBy == 'cityDESC'){
                sort = {city: "desc"}
            }
            else if(sortBy == 'stateASC'){
                sort = {state: "asc"}
            }
            else if(sortBy == 'stateDESC'){
                sort = {state: "desc"}
            }
            else if(sortBy == 'countryASC'){
                sort = {country: "asc"}
            }
            else if(sortBy == 'countryDESC'){
                sort = {country: "desc"}
            }
        }
        else{
            sort = {createdAt: "desc"}
        }

        const locationData = await Location.find(query).limit(parseInt(size)).skip((parseInt(page) - 1) * parseInt(size)).sort(sort)
        const tempData = await Location.find(query)

        return res.status(200).json({
            "isSuccess": true,
            "meta": {
                pageSize: parseInt(size),
                currentPage: parseInt(page),
                totalPages: Math.ceil((tempData.length/size)),
                totalDataCount: tempData.length
            },
            "message": "Data fetched successfully!",
            "data": locationData,
            "status":200
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

exports.updateLocation = async (req, res) => {
    try{
        const locationId = req.params.id
        const {name, address, coordinates, pincode, city, country, state} = req.body

        const locationData = await Location.findById(locationId)

        if(locationData){
            if(name != "" && name != undefined){
                locationData.name = name
            }
            if(address != "" && address != undefined && address != {}){
                locationData.address = address
            }
            if(coordinates != "" && coordinates != undefined && coordinates != {}){
                locationData.coordinates = coordinates
            }
            if(pincode != "" && pincode != undefined){
                locationData.pincode = pincode
            }
            if(city != "" && city != undefined){
                locationData.city = city
            }
            if(state != "" && state != undefined){
                locationData.state = state
            }
            if(country != "" && country != undefined){
                locationData.country = country
            }
    
            const newLocationData = await locationData.save()
    
            return res.status(200).json({
                "isSuccess": true,
                "message": "Location updated successfully!",
                "data": newLocationData,
                "status": 200
            })
        }
        else{
            return res.status(404).json({
                "isSuccess": false,
                "message": "Couldn't find location to update!",
                "data": "",
                "status": 404
            })
        }
        
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

exports.deleteLocation = async (req, res) => {
    try{
        const locationId = req.params.id;

        const temp = await Location.findById(locationId)


        if(temp && temp.restaurantId && temp.restaurantId != null && temp.restaurantId != undefined){
            
            return res.status(403).json({
                "isSuccess": true,
                "message": "Cannot delete locations that are already assigned!",
                "data": "",
                "status": 403
            })
        }
        else{
            
            const data = await Location.findByIdAndDelete(locationId)

            if(data == {} || data == null){
            
                return res.status(404).json({
                    "isSuccess": true,
                    "message": "Couldn't find location data to delete!",
                    "data": "",
                    "status": 404
                })
            }
            else{
                
                return res.status(200).json({
                    "isSuccess": true,
                    "message": "Location deleted successfully!",
                    "data": "",
                    "status": 200
                })
            }
            
            
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