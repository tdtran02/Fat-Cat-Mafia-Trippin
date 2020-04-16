//import crypto from "crypto";
const crypto = require("crypto");
const EXPRESS = require("express");
const FORGOTPASSWORDROUTES = EXPRESS.Router();
const USER = require("../models/user.model");
const nodemailer = require("nodemailer");
const cred = require("process");
const sender = require("../sender.js");

require("dotenv").config();

FORGOTPASSWORDROUTES.route("/forgotPassword").post(function (req, res) {
  //console.log("hello");
  if (req.body.email == "") {
    res.status(400).send("email required");
  }
  console.error(req.body.email);
  USER.findOne({ email: req.body.email }).then((user) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      pool: true,
      host: "smtp.example.com",
      port: 465,
      secure: true,
      auth: {
        user: sender.MAIL_USERNAME,
        pass: sender.MAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: "Trippin Webapp Service <trippinwebapp@gmail.com>",
      to: "dongxli710@gmail.com",
      subject: "Your Trip Information",
      text:
        "If you did not request this, please ignore this email and your password will remain unchanged.\n",
    };

    console.log("sending mail");

    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.error("there was an error: ", err);
      } else {
        console.log("here is the res: ", response);
        res.status(200).json("recovery email sent");
      }
    });
  });
});

module.exports = FORGOTPASSWORDROUTES;
