const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
var app = express()

require('dotenv').config()
const userRoutes = require('./routes/user')
const restaurantRoutes = require('./routes/restaurant')
const locationRoutes = require('./routes/location')
const shiftRoutes = require('./routes/shift')
const chatRoutes = require('./routes/chat')


var connection_string = "mongodb://localhost:27017"
mongoose.connect(connection_string, {usenewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("Database connected!");
})
.catch((err) =>{
    console.log("Error connecting database",err)
})

app.use(express.json())

var corsOption = {
    origin: '*'
}
app.use(cors(corsOption))

app.use(helmet({
    contentSecurityPolicy: false
}))

app.use("/api/", userRoutes)
app.use('/api/', restaurantRoutes)
app.use('/api/',locationRoutes)
app.use('/api/',shiftRoutes)
app.use('/api', chatRoutes)


const server = app.listen(process.env.PORT, () => {
    console.log(`APIs are running on http://localhost:${process.env.PORT}`)
})

const socket = require('socket.io')(server)


const io = socket.listen(server)

    io.on('connection', (socket) => {
        console.log("user connected")
    
        socket.on('disconnect', () => {
            console.log("user disconnected")
        })
    
        socket.on('save-message', (data) => {
            console.log(data)
            io.emit('new-message', {message: data})
        })
    })