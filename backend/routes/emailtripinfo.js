const EXPRESS = require("express");
const EMAILTRIPINFOROUTE = EXPRESS.Router();
const PDFDocument = require("pdfkit");
const fs = require("fs");
const nodemailer = require("nodemailer");
const sender = require("../sender.js");
const ASYNC = require("async");
const TRIP = require("../models/trip.model");
const USER = require("../models/user.model");

EMAILTRIPINFOROUTE.route("/emailtripinfo/:trip_id").get(function (req, res) {
  let trip;
  TRIP.findById(req.params.trip_id)
    .then((t) => {
      trip = t;
      return USER.find({ _id: { $in: t.buddies } });
    })
    .then((u) => {
      // create new document
      const doc = new PDFDocument();
      const stream = doc.pipe(fs.createWriteStream("trip.pdf"));
      doc
        .image("TRIPPIN.jpg", { fit: [100, 100] })
        .fontSize(20)
        .text("Trippin - " + trip.trip_name, { align: "center" });
      doc.moveDown();
      doc.fontSize(16).text("Basic Info: ", { underline: true });
      doc.fontSize(12).text("Destination: " + trip.destination);
      doc.fontSize(12).text("Start Date: " + trip.start_date.toDateString());
      doc.fontSize(12).text("End date: " + trip.end_date.toDateString());

      let difference_in_time = trip.end_date - trip.start_date;
      let difference_in_days = difference_in_time / (1000 * 3600 * 24);
      doc.fontSize(12).text("Number of days: " + difference_in_days);

      // Attendees
      if (u.length > 0) {
        doc.moveDown();
        doc.fontSize(16).text("Attendees:", { underline: true });
      }
      for (let i = 0; i < u.length; i++) {
        doc.fontSize(12).text(u[i].first_name + " " + u[i].last_name);
      }

      doc.moveDown();

      // Trip locartions
      for (let i = 0; i < trip.days.length; i++) {
        if (trip.days[i].length > 0 && i > 0) {
          doc.moveDown();
        }
        if (trip.days[i].length > 0) {
          doc.fontSize(16).text("Day " + (i + 1) + " :", { underline: true });
          for (let j = 0; j < trip.days[i].length; j++) {
            // name
            doc.fontSize(12).text(trip.days[i][j].name, {
              link: trip.days[i][j].url,
              underline: true,
            });
            //price check if its defined
            if (trip.days[i][j].price != undefined) {
              doc.fontSize(12).text("Pirce: " + trip.days[i][j].price);
            }
            //ratings
            doc.fontSize(12).text("Ratings: " + trip.days[i][j].rating);
            //display phone
            doc.fontSize(12).text("Phone: " + trip.days[i][j].display_phone);
            doc.moveDown();
          }
        }
      }

      doc.end();
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

      stream.on("finish", function () {
        ASYNC.eachSeries(
          trip.buddies,
          function (buddy, callback) {
            console.log(buddy);
            USER.findById(buddy)
              .then((b) => {
                console.log(b);
                const mailOptions = {
                  from: "Trippin Webapp Service <trippinwebapp@gmail.com>",
                  to: b.email,
                  subject: "Your Trip Info",
                  text:
                    "If you did not request this, please ignore this email and your password will remain unchanged.\n",
                  attachments: [
                    {
                      filename: "trip.pdf",
                      content: fs.createReadStream("trip.pdf"),
                    },
                  ],
                };
                transporter.sendMail(mailOptions, (err, response) => {
                  if (err) {
                    console.error("there was an error: ", err);
                  }
                  callback();
                });
              })
              .catch((err) => {
                console.log(err);
                callback();
              });
          },
          function (err) {
            if (err) {
              console.error("there was an error: ", err);
              res.status(200).json({
                sent: false,
              });
            } else {
              res.status(200).json({
                sent: true,
              });
            }
          }
        );
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = EMAILTRIPINFOROUTE;
