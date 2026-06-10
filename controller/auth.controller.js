const User = require("../modules/user")
const Otp = require("../modules/otp")


const crypto = require("crypto");
const generateAccessToken = require("../utils/generateAccessToken");
const generateRefreshToken = require("../utils/generateRefreshToken");

exports.register = async (req,res)=>{

    const {name,email,password} = req.body;
    const user = await User.create({
        name,email,password
    })  

    const otp = Math.floor(100000 + Math.random() * 900000)

    await Otp.create({
        email,
        otp,
        expiredAt:Date.now()+5*60*1000
    })

    res.status(201).json({
        message: "User registered. Verify OTP."
    })

}

exports.verifyOpt = async (req,res)=>{
    const {email,otp} =   req.body
    const record =  await Otp.findOne({
        email,otp
    })

    if(!record) return res.status(400).json({
        message:"Invalid OTP"
    })

    await Otp.findOne(
        {email},
        {
            isVarified:true
        }
    )

    await Otp.deleteMany({email})

    res.status(201).json({message:"OTP vaerified"})
}

exports.login = (req,res)=>{
    const {email,password} = req.body

    const user = await User.findOne({email})

    if(!user) return res.status(401).json({
        message:"No user found"
    })

    const match = await user.comparePassword(password)
    if(!match) return  res.status(401).json({
        message:"Invalid Credential"
    })

    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    user.refreshToken = refreshToken

    await user.save()

    res.json({
        accessToken,
        refreshToken
    })
}