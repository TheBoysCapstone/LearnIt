const User = require("../models/user.js")

module.exports = (req, res, next) =>{
    if(req.user && req.params.id===req.user._id.toString()){
        next()
    }
    else{
        res.json({success: false, message: "You do not have permission to access this page", redirectTo:"register"})
    }
}