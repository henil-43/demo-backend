const { Shift } = require('../modules/shift')

exports.createShift = async (req, res) => {
    try{
        const {name, restaurantId, startDate, endDate, weekDays} = req.body
        // weekDays = [1,2,3,4]

        const startTime = new Date(startDate)
        const endTime = new Date(endDate)
        var shiftData = []
        for(let day = startTime; day <= endTime; day.setDate(day.getDate() + 1)){

            if(weekDays.includes(parseInt(day.getDay()))){
                let shift = new Shift()
                let tempDay = new Date(day)
                shift.name = name
                shift.restaurantId = restaurantId
                shift.shiftDate = tempDay
                shift.startDate = new Date(startDate)
                shift.endDate = endTime
                shift.weekDays = weekDays

                var savedShiftData = await shift.save()
                
                shiftData.push(savedShiftData)
            }
        }

        return res.status(200).json({
            "isSuccess": true,
            "message": "Shifts added successfully!",
            "data": shiftData,
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

exports.getAllShifts = async (req, res) => {
    try{
        var {page, size, search, sortBy, restaurantId, startDate, endDate} = req.query

        let query = {}

        if(restaurantId && restaurantId != ""){
            query = {
                ...query,
                restaurantId: restaurantId
            }
        }
        var startTime = new Date(startDate)
        var endTime = new Date(endDate)
        
        if(startDate && startDate != "" && startDate != undefined){
            query = {
                ...query,
                shiftDate: {
                    $gte: startTime,
                },
            }
        }

        if(endDate && endDate != "" && endDate != undefined){
            if(startDate && startDate != "", startDate != undefined){
                query = {
                    ...query,
                    shiftDate: {
                        $gte: startTime,
                        $lte: endTime,
                    },
                }
            }
            else{
                query = {
                    ...query,
                    shiftDate: {
                        $lte: endTime,
                    },
                }
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
                sort = {shiftDate: "asc"}
            }
            else if(sortBy == 'nameASC'){
                sort = {name: "asc"}
            }
            else if(sortBy == 'nameDESC'){
                sort = {name: "desc"}
            }
        }
        else{
            sort = {shiftDate: "desc"}
        }

        const shiftData = await Shift.find(query).limit(parseInt(size)).skip((parseInt(page) - 1) * parseInt(size)).sort(sort)
        const tempData = await Shift.find(query)

        return res.status(200).json({
            "isSuccess": true,
            "message": "Data fetched successfully",
            "meta": {
                pageSize: parseInt(size),
                currentPage: parseInt(page),
                totalPages: Math.ceil((tempData.length/size)),
                totalDataCount: tempData.length
            },
            "data": shiftData,
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