const jwt = require("jsonwebtoken")

module.exports = (req,res,next)=>{
    const token = req.header.authorization?.split(" ")[1]

    if(!token) return res.status(401).json({message:"authorization"})

    const decode = jwt.verify(
        token,
        process.env.JWT_SECRET
    )
    
    req.user = decode
    next()
}