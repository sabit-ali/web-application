import { app } from "./app.mjs";

import dotenv from 'dotenv'
import connectDB from "./src/db/mongoose.mjs";
import {Server} from 'socket.io'
import { createServer } from "http";

const server = createServer(app)
const io = new Server(server,{
    cors : {
        origin : "*",
        methods : ["GET","POST"],
        credentials : true
    }
    
})


dotenv.config({
    path :'./.env'
})

connectDB()




.then(()=>{
      

    io.on("connection",(socket)=>{
        console.log(`User Connected userID : ${socket.id}`)

        socket.on("disconnect",()=>{
            console.log("User Disconnected")
        })
    })
    
    server.listen(process.env.PORT,()=>{
        console.log('server is running port',process.env.PORT)
    })
})

export {io}