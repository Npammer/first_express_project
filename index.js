const express = require("express");
const members = require("./data/Members");
const logger = require("./middleware/logger");
const app = express();
const path = require("path");
const port = 3001;

// init middleware
// app.use(logger);

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/about", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

app.get("/contact-us", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "contact-us.html"));
});

// GET all members
app.get("/api/members", (req, res) => res.json(members));

// GET single member
app.get("/api/members/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
  }
  res.status(400).json({ msg: `No member with id: ${req.params.id}` });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
