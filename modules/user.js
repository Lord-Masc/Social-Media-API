const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    isvarified:{
        type:Boolean,
        default:false,
    },
    refreshToken:String
},{timestamps:true})

userSchema.pre("save",async (next)=>{
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password,12)
    next()
})

userSchema.method.comparePassword = async (next)=>{
    return bcrypt.compare(password,this.password)
}

module.exports = mongoose.model("User",userSchema)