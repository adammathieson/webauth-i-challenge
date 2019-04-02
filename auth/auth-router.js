const router = require("express").Router();
const bcrypt = require("bcrypt");

const Users = require("../users/users-models");

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
        req.session.user = user;
        res.status(200).json({ message: "Logged in" });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.status(500).json({ message: "Unable to logout" });
      } else {
        res.status(200).json({ message: "You are logged out" });
      }
    });
  } else {
    res.status(200).json({ message: "You are logged out" });
  }
});

module.exports = router;
