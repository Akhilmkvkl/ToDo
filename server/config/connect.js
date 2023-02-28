const mongoose = require('mongoose')

const connectDB = async()=>{
    try {
       const connect = await mongoose.connect(process.env.MONGO_URI) 
       console.log(`MOGODB CONNECTED`);
    } catch (error) {
        console.log(error);
        // process.exit(1)
    }
}

//Another method to connect monogoDB

// mongoose
// .connect(process.env.MONGO_URI)
// .then(()=>{
//             app.listen(PORT,()=>{
//                 console.log(`The Server is running on port ${PORT}`);
//             }) 
// })
// .catch((error)=>{
//     console.log(error);
// })


module.exports = connectDB 