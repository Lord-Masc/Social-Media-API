const mongoose = require("mongoose")

const connectDB = async ()=>{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Databse connectes");
}
module.exports = connectDB