import express from 'express';
import connectDb from './utils/db.js';
import "dotenv/config";
import userRoutes from './routes/user.routes.js'
import { Server } from 'socket.io';
import { createServer } from 'http';
import cors from 'cors';


const app=express();
app.use(express.json());
const server=createServer(app);

const PORT=process.env.PORT || 5000;
const allowedOrigins = "https://pointsleaderboard.netlify.app/";
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
const io=new Server(server,{cors:{
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    
}});

io.on("connection",(socket)=>{
    console.log("Client connected",socket.id);


    socket.on("disconnect",()=>{
        console.log("Client disconnected",socket.id);
    })
})
//I attach `io` to app so controllers can use it
app.set("io", io);

app.get("/get",(req,res)=>{
    res.send("Hello World!");
})
app.use("/api",userRoutes)
server.listen(PORT,()=>{
    console.log(`Server is running on port: ${PORT}`);
    connectDb();
})