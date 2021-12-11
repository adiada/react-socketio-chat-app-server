const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')
//middleware
app.use(cors())

const port = process.env.PORT || 5000;
const server = http.createServer(app)

const io = new Server(server,{
    cors: {
        origin: "*",
        method: ['GET','POST'],
    },
});

io.on('connection',(socket) => {
    console.log('User connected',socket.id)


    socket.on('join_room',(data)=>{
        socket.join(data)
        console.log(`User with id ${socket.id} joined room : ${data}`)
    })

    socket.on('send_message',(data)=> {
        socket.to(data.room).emit('recieve_message',data)
        console.log(data)
    })

    socket.on('disconnect',() => {
        console.log('user disconnected',socket.id)
    })
} )



server.listen(port,() => {
    console.log(`listening on port ${port}`)
})