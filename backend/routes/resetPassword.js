const EXPRESS = require("express");
const RESETPASSWORDROUTES = EXPRESS.Router();
const USER = require("../models/user.model");

RESETPASSWORDROUTES.route("/resetPassword/:token").get(function(req, res){
    console.log(req.params.token);
    console.log("hi");
    USER.findOne(
        {$and:[{ resetPasswordToken: req.params.token }, { resetPasswordExpires: {$gt: Date.now()} }]}
        //{resetPasswordToken: req.params.token}
        ).then(user =>{
        if(user == null){
            console.log("Can't find user");
            console.log("Password reset link is invalid or has expired");
            res.json("Password reset link is invalid or has expired");
        }else{
            res.status(200).send({
                email: user.email,
                message: "Password reset link is ok",
            });
        };
    });
});

module.exports = RESETPASSWORDROUTES;