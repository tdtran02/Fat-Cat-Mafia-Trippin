const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const ROUTER = express.Router();

/* const multer = require('multer');
const upload = multer({ storage: storage }); */
const fs = require("fs");

const FRIENDROUTES = require("./routes/friend");
const LOGINROUTES = require("./routes/login");
const REGISTEROUTES = require("./routes/register");
const USERROUTES = require("./routes/user");
const QUESTIONROUTES = require("./routes/question");
const TRIPROUTES = require("./routes/trip");
const FORGOTPASSWORDROUTES = require("./routes/forgotPassword");
const SPENDINGROUTES = require("./routes/spending");
const RESETPASSWORDROUTES = require("./routes/resetPassword");
const UPDATEPASSWORDVIAEMAILROUTES = require("./routes/updatePasswordViaEmail");
const COMMENTROUTES = require("./routes/comment");
const TRIPBUDDYROUTES = require("./routes/tripbuddy");
const DRIVERROUTES = require("./routes/driver");
const UPLOADROUTES = require("./routes/saveImage");
const EMAILTRIPINFOROUTES = require("./routes/emailtripinfo");
const POLLSROUTES = require("./routes/polls");
const env = process.env.NODE_ENV;
const PORT =
  env === "production"
    ? "trippin.website/api"
    : 4000;
app.use(cors());
app.use(bodyParser.json());

const db = require("./config_url").mongoURL;
mongoose.set("useFindAndModify", false);
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});

app.use(LOGINROUTES, ROUTER);
app.use(REGISTEROUTES, ROUTER);
app.use(USERROUTES, ROUTER);
app.use(FRIENDROUTES, ROUTER);
app.use(QUESTIONROUTES, ROUTER);
app.use(TRIPROUTES, ROUTER);
app.use(FORGOTPASSWORDROUTES, ROUTER);
app.use(SPENDINGROUTES, ROUTER);
app.use(RESETPASSWORDROUTES, ROUTER);
app.use(UPDATEPASSWORDVIAEMAILROUTES, ROUTER);
app.use(COMMENTROUTES, ROUTER);
app.use(TRIPBUDDYROUTES, ROUTER);
app.use(DRIVERROUTES, ROUTER);
app.use(UPLOADROUTES, ROUTER);
app.use(EMAILTRIPINFOROUTES, ROUTER);
app.use(POLLSROUTES, ROUTER);

/* const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, 'uploads/')
  }
}); */

/* router.route('/img_data')
  .post(upload.single('file'), function (req, res) {
    var new_img = new Img;
    new_img.img.data = fs.readFileSync(req.file.path)
    new_img.img.contentType = 'image/jpeg';
    new_img.save();

    res.json({ message: 'New image added to the database!' });
  }); */

// todoRoutes.route("/").get(function(req, res) {
//   console.log(">>>>>>");
//   Todo.find(function(err, todos) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.json(todos);
//     }
//   });
// });

// todoRoutes.route("/:id").get(function(req, res) {
//   let id = req.params.id;
//   Todo.findById(id, function(err, todo) {
//     res.json(todo);
//   });
// });

// todoRoutes.route("/update/:id").post(function(req, res) {
//   Todo.findById(req.params.id, function(err, todo) {
//     if (!todo) res.status(404).send("data is not found");
//     else todo.todo_description = req.body.todo_description;
//     todo.todo_responsible = req.body.todo_responsible;
//     todo.todo_priority = req.body.todo_priority;
//     todo.todo_completed = req.body.todo_completed;

//     todo
//       .save()
//       .then(todo => {
//         res.json("Todo updated!");
//       })
//       .catch(err => {
//         res.status(400).send("Update not possible");
//       });
//   });
// });

// todoRoutes.route("/add").post(function(req, res) {
//   let todo = new Todo(req.body);
//   todo
//     .save()
//     .then(todo => {
//       res.status(200).json({ todo: "todo added successfully" });
//     })
//     .catch(err => {
//       res.status(400).send("adding new todo failed");
//     });
// });

// // CRUD-Delete works
// // Postman: select Delete
// // route: localhost:4000/todos/delete/
// // + whatever id wanted to delete

// /* DELETE */
// todoRoutes.route("/delete/:id").delete(function(req, res) {
//   Todo.findByIdAndRemove(req.params.id)
//     .then(note => {
//       if (!note) {
//         return res.status(404).send({
//           message: "Todos not found with id " + req.params.id
//         });
//       }
//       res.send({ message: "Todos deleted successfully!" });
//     })
//     .catch(err => {
//       if (err.kind === "ObjectId" || err.name === "NotFound") {
//         return res.status(404).send({
//           message: "Todos not found with id " + req.params.id
//         });
//       }
//       return res.status(500).send({
//         message: "Could not delete todos with id " + req.params.id
//       });
//     });
// });

// app.use("/todos", todoRoutes);
// app.delete("/todos/:id", todoRoutes);
// app.listen(PORT, function() {
//   console.log("Server is running on Port: " + PORT);
// });

// /* UPDATE */
// todoRoutes.put("/:id", function(req, res, next) {
//   Todo.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

module.exports = ROUTER;
