//1 automatic load =>.env files into our project
require('dotenv').config()

//2 import express 
const express=require('express')

//5.1 import cors
const cors=require('cors')

//import db
require('./db/connection')

//import router
const router = require('./routes/router')

//3 create a server app using express function
const server=express()

//4.1 to store port number
const port=5000

//5.2 use cors in server application
server.use(cors())
server.use(express.json())
server.use(router)

//route -localhost://5000
server.get('/',(req,res)=>{
    res.status(200).json('E-commerce Service Response')
})

//4.2  to run the server application
server.listen(5000,()=>{
    console.log(`server listening on port ${port}`)
})



