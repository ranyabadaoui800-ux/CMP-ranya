const express = require('express')
const app = express();
const connectDB = require('./config/Db')
const port = 4002
const dotenv = require('dotenv')
dotenv.config()

app.get('/',(req,res)=>{
    res.send('Hello from back')
})


connectDB()
app.listen(port,(req,res)=>{
    console.log("le serveur tourne dans le port "+ port)
})