const express = require("express");
const County = require("../../../models/County");
const router = express.Router();
var routeCache = require("route-cache");

// Create a route for grabbing all counties
router.get("/fetchAllCounties", routeCache.cacheSeconds(30), (req, res) => {
  County.find({}, (err, counties) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(counties);
  });
});

module.exports = router;
