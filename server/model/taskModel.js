const mongoose = require('mongoose')

const taskShema = mongoose.Schema(
    {
        name:{
           type:String,
            required:[true, "Please enter a task"],
        },
        complte:{
            type:Boolean,
            required:true,
            default:false
        }
    },{timestamps:true}
)

const Task = mongoose.model("task",taskShema)
module.exports = Task