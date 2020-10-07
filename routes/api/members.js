const express = require("express");
const router = express.Router();
const uuid = require("uuid");

const members = require("../../data/Members");

// GET all members
router.get("/", (req, res) => res.json(members));

// GET single member
router.get("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
  }
  res.status(400).json({ msg: `No member with id: ${req.params.id}` });
});

// create member
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };

  if (!newMember.name || !newMember.email) {
    res
      .status(400)
      .json({ msg: "You must include a name and an email with your request" });
  } else {
    members.push(newMember);
    // res.redirect("/"); // View
    res.json(members); // API
  }
});

// Update member
router.put("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    const updMember = req.body;
    members.forEach(member => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updMember.name ? updMember.name : member.name;
        member.email = updMember.email ? updMember.email : member.email;

        res.json({ msg: "Member updated", member });
      }
    });
  }
  res.status(400).json({ msg: `No member with id: ${req.params.id}` });
});

// Delete member
router.delete("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    res.json({
      msg: "Member deleted",
      members: members.filter(member => member.id !== parseInt(req.params.id)),
    });
  }
  res.status(400).json({ msg: `No member with id: ${req.params.id}` });
});

module.exports = router;
