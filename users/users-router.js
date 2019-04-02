const router = require("express").Router();

const restricted = require("../auth/restricted-middleware.js");
const Users = require("./users-models.js");

router.get("/", restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
