const EXPRESS = require("express");
const RESETPASSWORDROUTES = EXPRESS.Router();
const USER = require("../models/user.model");
// import ResetPassword from './resetPassword';
{/* <Router>
    <App>
        <Switch>
                <Route exact path='/resetPassword/:param' component={ResetPassword} />
        </Switch>         
    </App>
</Router> */}
// RESETPASSWORDROUTES.route("/resetPassword").post(function(req, res){
//     console.log("hi")
// });

RESETPASSWORDROUTES.route("/resetPassword/:token").get(function(req, res){
    console.log(req.params.token);
    console.log("hi");
    USER.findOne(
            //{resetPasswordToken: req.query.resetPasswordToken},
            // {resetPasswordToken: req.params.token},
            // {$set:{resetPasswordExpires: $gt: Date.now()}}
        //   {where:  { resetPasswordToken: req.params.token,
        //       resetPasswordExpires: {$gt: Date.now()}
        //   }}
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