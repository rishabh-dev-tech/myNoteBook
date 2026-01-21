const jwt = require("jsonwebtoken")
require("dotenv").config()
const authModel = require("../schema/auth.model");

const VerifyUserFun = async (req, res, next) => {

    console.log(req.header("token"))
    const token = req.header("token")

    if (!token) {
        return res.send({
            success: false,
            message: "User authentication require"
        })
    }

    const isVerify = jwt.verify(token, process.env.SECRETKEY)
    if (!isVerify) {
        return res.send({
            success: false,
            message: "Invalid token"
        })
    }

    console.log(isVerify)

    const auth = await authModel.findById(isVerify.id).select("-password")
    console.log(auth)
    if (!auth) {
        return res.send({
            success: false,
            message: "User not found"
        })
    }
    req.user = auth._id
    next()

}

module.exports = VerifyUserFun