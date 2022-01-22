const express = require("express");
const router = express.Router();
var routeCache = require("route-cache");

router.get("/navbarLinks", routeCache.cacheSeconds(30), (req, res) => {
  // Check if user is logged in or not.
  if (req.user) {
    console.log(req.user);
  }
});

module.exports = router;
