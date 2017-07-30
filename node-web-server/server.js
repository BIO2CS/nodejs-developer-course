const express = require("express");
const path = require("path");
const hbs = require("hbs");
const fs = require("fs");

const app = express();

hbs.registerPartials(path.join(__dirname, "views/partials"));
app.set("view engine", "hbs");

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url} \n`;
  console.log(log);

  fs.appendFile("server.log", log, err => {
    if (err) {
      throw err;
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render("maintenance.hbs");
// });

app.use(express.static(path.join(__dirname, "public")));

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text) => {
  return text.toUpperCase();
})

app.get("/", (req, res) => {
  res.render("home.hbs", {
    pageTitle: "This is Home Page",
    welcomeMessage: "Welcome to my website"
  })
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About Page"
  });
});

app.listen(3000, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Server is up on port 3000");
  }
})
