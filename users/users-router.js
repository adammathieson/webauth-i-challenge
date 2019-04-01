const router = require("express").Router();
const bcrypt = require("bcrypt");

const db = require("../database/dbConfig.js");
const Users = require("./users-models.js");

router.post("/register", (req, res) => {
  let user = req.body;

  //creates a hash out of users password and saves it as hash
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;

  Users.add(user)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: "Logged in" });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/users", restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

function restricted(req, res, next) {
  const { username, password } = req.headers;

  if (username && password) {
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).json({ message: "You shall not pass!" });
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  } else {
    res.status(401).json({ message: "Please provide credentials." });
  }
}

module.exports = router;
