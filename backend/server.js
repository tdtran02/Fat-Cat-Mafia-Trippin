const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const ROUTER = express.Router();
const PORT = 4000;

const LOGINROUTES = require("./routes/login");

app.use(cors());
app.use(bodyParser.json());

const db = require("./config_url").mongoURL;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});

app.use(LOGINROUTES, ROUTER);


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
