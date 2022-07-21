const { User } = require('../modules/user') 
const crypto = require('crypto')
const {generatepassword, validatepassword} = require('../utils/password.utils')
const {jwtGenerator} = require('../utils/jwt.utils')

exports.signup = async (req, res) => {
    try{
        const {firstName, lastName, address, age, phoneNo, email, password} = req.body;

        const userData = await User.findOne({email: email})
        if(userData){
            
            return res.status(200).json({
                "isSuccess": false,
                "message": "Email already registered!",
                "data": email,
                "status": 200
            })    
        }
        else{
            const {hash, salt} = await generatepassword(password)

            const user = new User()

            user.email = email
            user.firstName = firstName
            user.lastName = lastName
            user.age = age
            user.address = address
            user.phoneNo = phoneNo
            user.hash = hash
            user.salt = salt

            let savedUser = await user.save()

            const payload = {
                userId: user._id
            }

            return res.status(200).json({
                "isSuccess": true,
                "message": "User added successfully!",
                "data": {
                    email: savedUser.email,
                    accessToken: await jwtGenerator(payload)
                },
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


exports.login = async (req, res) =>{
    try{
        const {email, password} = req.body
        console.log(req.body)

        const user = await User.findOne({email: email})

        if(!user){

            return res.status(404).json({
                "isSuccess": true,
                "message": "User not found!",
                "data": "",
                "status": 404
            })
        }
        if(!await validatepassword(password, user.hash, user.salt)){
            return res.status(401).json({
                "isSuccess": true,
                "message": "Invalid Credentials!",
                "data": "",
                "status": 404
            })
        }

        const payload = {
            userId: user._id
        }

        const data = {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            accessToken: await jwtGenerator(payload) 
        }

        return res.status(200).json({
            "isSuccess": true,
            "message": "Logged in successfully!",
            "data": data,
            "status": 200
        })

    }
    catch(err){

        return res.status(500).json({
            "isSuccess": true,
            "message": "Internal server error!",
            "data": "",
            "status": 500
        })
    }
}

exports.getAllUsers = async (req, res) => {
    try{
        const data = await User.find().lean()

        return res.status(200).json({
            "isSuccess": true,
            "message": "users fetched successfully!",
            "data": data,
            "status": 200
        })

    }
    catch(err){

        return res.status(500).json({
            "isSuccess": true,
            "message": "Internal server error!",
            "data": "",
            "status": 500
        })
    }
}

exports.getUserById = async (req, res) => {
    try{
        let id = req.params.id

        let data = await User.findById(id)

        if(!data){
            return res.status(400).json({
                "isSuccess": true,
                "message": "User not found!",
                "data": "",
                "status": 400
            })    
        }

        return res.status(200).json({
            "isSuccess": true,
            "message": "User fetched!",
            "data": data,
            "status": 200
        })
    }
    catch(err){
        return res.status(500).json({
            "isSuccess": true,
            "message": "Internal server error!",
            "data": "",
            "status": 500
        })
    }
}

exports.updateUser = async (req, res) => {
    try{
        const id = req.params.id;
        const {firstName, lastName, address, age, phoneNo, email} = req.body;

        var userData = await User.findById(id);
        if(firstName != "" && firstName != undefined){
            userData.firstName = firstName
        }
        if(lastName != "" && lastName != undefined){
            userData.lastName = lastName
        }
        if(email != "" && email != undefined){
            userData.email = email
        }
        if(address != "" && address != undefined){
            userData.address = address
        }
        if(phoneNo != "" && phoneNo != undefined){
            userData.phoneNo = phoneNo
        }
        if(age != "" && age != undefined){
            userData.age = age
        }
        
        const newUserData = await userData.save();

        return res.status(200).json({
            "isSuccess": true,
            "message": "User updated successfully!",
            "data": newUserData,
            "status": 200
        })
    }
    catch(err){
        return res.status(500).json({
            "isSuccess": true,
            "message": "Internal server error!",
            "data": "",
            "status": 500
        })
    }
}

exports.deleteUser = async (req, res) => {
    try{
        let id = req.params.id

        let userData = await User.findByIdAndDelete(id);

        if(!userData){
            return res.status(404).json({
                "isSuccess": false,
                "message": "User not found!",
                "data": "",
                "status": 404
            })    
        }

        return res.status(200).json({
            "isSuccess": true,
            "message": "User deleted successfully",
            "data": "",
            "status": 200
        })
    }
    catch(err){
        return res.status(500).json({
            "isSuccess": true,
            "message": "Internal server error!",
            "data": "",
            "status": 500
        })
    }
}