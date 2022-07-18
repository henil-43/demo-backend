const jwt = require('jsonwebtoken')

exports.isAuthenticated = (req, res, next) => {
    if (req.headers.authorization == null || req.headers.authorization == undefined) {

        return res.status(401).json({
              "isSuccess": false,
              "messaage": "Unauthorized request",
              "data": "",
              "status": 401
        })

    }

    let jwttoken = req.headers.authorization
    let token = jwttoken.split(" ")

    jwt.verify(token[1], process.env.AUTH_SECRET, (err, authorized) => {
        if(err){

            return res.status(401).json({
                "isSuccess": false,
                "messaage": "Unauthorized request",
                "data": "",
                "status": 401
            })
        }

        req.userId = authorized.userId

        next()
    })

}