const router = require("express").Router();
const bcrypt = require("bcrypt");

const db = require("../database/dbConfig.js");
const Users = require("./users-models.js");

router.post("/register", (req, res) => {
  const { username, password } = req.body;
});

router.post("/login", (req, res) => {
  c;
});

router.get("/users", (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
