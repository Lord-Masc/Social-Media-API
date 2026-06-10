const { register, verifyOpt, login } = require("../controller/auth.controller")

const router = require("express").Router()

router.post("/register",register)
router.post("/verify-opt",verifyOpt)
router.post("/login",login)

module.exports = router