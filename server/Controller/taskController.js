const { findOne } = require("../model/taskModel");
const Task = require("../model/taskModel");

//Create Task
const createTask = async(req,res) => {
    try {
        const task = await Task.create(req.body)
        res.status(200).json(task)
       } catch (error) {
        res.status(500).json({msg:error.message})
       }
}
//Get Task
const GetTask = async(req,res) => {
    try {
        const task = await Task.find()
        res.status(200).json(task) 
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}
//Get SingleTask
const getTask = async(req,res)=>{
   try {
    const  id  = req.params
    const task = await Task.findOne({id})
    if(!task){
        res.status(400).res.json(`NO TASK WITH THIS ID ${id}`)
    }else{
        res.status(200).json(task)
    }
   } catch (error) {
    res.status(500).json({msg:error.message})
   }
}
const deleteTask = async(req,res)=>{
    const { id } = req.params
    try {
        const task = await Task.findByIdAndDelete(id)
        if(task){
            res.status(200).send("Task Deleted")
        }else{
            res.status(400).json(`NO TASK WITH THIS ID ${id}`)
        }
    } catch (error) {
      res.status(500).json({msg:error.message})  
    }
}
//update task put
// const updateTask = async(req,res)=>{
//     const {id} = req.params
//     try {
//         // console.log(req.body)
//         const task = await Task.findByIdAndUpdate(
//             {_id:id},req.body,{new:true,runValidators : true,},
            
//             )
//             res.status(200).json(task)
        
//     } catch (error) {
//         res.status(500).json({msg:error.message})  
//     }
// }
//update task patch
const updateTask = async(req,res)=>{
    const {id} = req.params
    try {
        // console.log(req.body)
        const task = await Task.findByIdAndUpdate(
            {_id:id},req.body,{new:true,runValidators : true,},
            
            )
            res.status(200).json(task)
        
    } catch (error) {
        res.status(500).json({msg:error.message})  
    }
}


module.exports = {
    createTask,
    GetTask,
    getTask,
    deleteTask,
    updateTask,
}