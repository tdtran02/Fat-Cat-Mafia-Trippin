const EXPRESS = require("express");
const RESETPASSWORDROUTES = EXPRESS.Router();
const USER = require("../models/user.model");
import ResetPassword from './resetPassword';
<Router>
    <App>
        <Switch>
                <Route exact path='/resetPassword/:param' component={ResetPassword} />
        </Switch>         
    </App>
</Router>

RESETPASSWORDROUTES.route("/resetPassword").get(function(req, res){
    USER.findOne({
        where:{
            resetPasswordToken: req.query.resetPasswordToken,
            resetPasswordExpires:{
                $gt: Date.now(),
            },
        },
    }).then(user =>){
        if(user == null){
            console.log("Password reset link is invalid or has expired");
            res.json("Password reset link is invalid or has expired");
        }else{
            res.status(200).send({
                username: user.username,
                message: "Password reset link is ok",
            });
        };
    };

module.exports = RESETPASSWORDROUTES;