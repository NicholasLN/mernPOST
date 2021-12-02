const express = require("express");
const router = express.Router();

router.get("/profile", (req, res) => {
  res.status(200).json({ message: "Profile", user: req.user, token: req.query.secret_token });
});

module.exports = router;
