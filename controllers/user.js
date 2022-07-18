const { User } = require('../modules/user') 
const crypto = require('crypto')
const {generatepassword, validatepassword} = require('../utils/password.utils')
const {jwtGenerator} = require('../utils/jwt.utils')

exports.signup = async (req, res) => {
    try{
        const {email, password} = req.body;

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