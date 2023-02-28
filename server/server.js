const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const connectDB = require('./config/connect')
const mongoose = require('mongoose')
const taskRouter = require('./Router/taskRouter')
const cors = require('cors')


//Router
app.get('/',(req,res)=>{
    res.send("Home Page");
})

//MiddleWare
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors()) 
app.use(taskRouter);


//Port
const PORT = process.env.PORT || 5000
//Database
const connectServer = async() =>{
    try {
        await connectDB();
        const PORT = process.env.PORT || 5000
        app.listen(PORT,()=>{
            console.log(`The Server is running on port ${PORT}`);
        }) 
    } catch (error) {
        console.log(error);
    }
}
connectServer();
