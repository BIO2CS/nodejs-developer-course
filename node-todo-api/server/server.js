var express = require("express");
var bodyParser = require("body-parser");

const { mongoose } = require("./db/mongoose");
const { Todo } = require("./models/todos");
const { User } = require("./models/user");


var app = express();

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then(doc => {
    res.send(doc);
  }, err => {
    res.status(400).send(err);
  });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

// var newTodo = new Todo({
//   text: "Find a better job",
//   completed: false
// });
//
// newTodo.save().then(doc => {
//   console.log("Saved new doc", doc);
// }, err => {
//   console.log("Unable to save new doc");
// });

// var otherTodo = new Todo({
//   text: " Find a boyfriend ",
//   completed: false
// });
//
// otherTodo.save().then(doc => {
//   console.log("Saved new doc", doc);
// }, err => {
//   console.log("Unable to save new doc");
// });

// var newUser = new User({
//   email: "hgu@example.com"
// });
//
// newUser.save().then(doc => {
//   console.log(JSON.stringify(doc, undefined, 2));
// }, err => {
//   console.log("Cannot save new user");
// });
