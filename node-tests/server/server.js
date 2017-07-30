const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.status(404).send({
    error: "Page not found.",
    name: "Node test"
  });
});

app.get("/user", (req, res) => {
  res.status(200).send([
    {
      name: "Joan",
      age: 31
    },
    {
      name: "John",
      age: 33
    },
    {
      name: "Jane",
      age: 30
    }
  ])
});

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server is running on port 3000");
  }
});

module.exports = app;
