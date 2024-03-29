const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
var app = express()
var server = require('http').createServer(app)
const socket = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
        transports: ['websocket', 'polling'],
    },
    allowEIO3: true
})
server.listen(8080);

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
    contentSecurityPolicy: false,
}))

app.use("/api/", userRoutes)
app.use('/api/', restaurantRoutes)
app.use('/api/',locationRoutes)
app.use('/api/',shiftRoutes)
app.use('/api', chatRoutes)


app.listen(process.env.PORT, () => {
    console.log(`APIs are running on http://localhost:${process.env.PORT}`)
})

const io = socket.listen(server, {serveClient: true})

    io.on('connection', (socket) => {
        console.log("user connected")
    
        socket.on('disconnect', () => {
            console.log("user disconnected")
        })
    
        socket.on('save-message', (data) => {
            io.emit('new-message', data)
        })

        socket.on('update-status', (data) => {
            io.emit('status-changed', data)
        })
    })

app.set('io',io)