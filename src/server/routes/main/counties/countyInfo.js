const express = require("express");
const County = require("../../../models/County");
const router = express.Router();
var routeCache = require("route-cache");

const getPathPoints = (path) => {
  const p = path
    .split(/[\s,MLZ]+/)
    .slice(1, -1)
    .reduce((all, coord, index) => {
      if (index % 2 === 0)
        all.push({
          x: coord,
        });
      else all[all.length - 1].y = coord;
      return all;
    }, []);
  // We want to return an array of objects with x and y properties
  return p;
};

// Create a route for grabbing all counties
router.get("/fetchAllCounties", routeCache.cacheSeconds(30), (req, res) => {
  County.find({}, (err, counties) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(counties);
  });
});

module.exports = router;
