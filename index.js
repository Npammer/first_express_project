const express = require("express");
// const logger = require("./middleware/logger");
const exphbs = require("express-handlebars");
const app = express();
const path = require("path");
const port = 3001;

const members = require("./data/Members");

// init middleware
// app.use(logger);

// Handlebars middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage route
app.get("/", (req, res) =>
  res.render("index", { title: "Members APP", members })
);

app.get("/about", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

app.get("/contact-us", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "contact-us.html"));
});

// API routes
app.use("/api/members", require("./routes/api/members"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
