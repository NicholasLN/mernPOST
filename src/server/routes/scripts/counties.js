const express = require("express");
const router = express.Router();
const passport = require("passport");
const { logDB } = require("../../../miscNodeFunctions/logging");
// Import the model (county)
const County = require("../../models/County");

// Let's create a route for populating counties.
// It should verify that the user is logged in. Their role should = dev.
router.get("/populateCounties", passport.authenticate("isDev", { session: false }), (req, res) => {
  const counties = require("../../assets/counties.json");
  // First, let's empty the County collection of all documents.
  County.deleteMany({}, (err) => {
    if (err) {
      console.log(err);
    }
  });

  // The counties object looks like this
  /*
  {
    state: [ {id, name, path, neighbors:[neighborid, neighborid, ...]} ],
    state: [ {id, name, path, neighbors:[neighborid, neighborid, ...]} ],
    ...
  }
  */
  // We want to loop through counties, and add them to the database. There's a lot of documents, so we should use insertMany.
  // Prepare the object first.
  const countiesToAdd = [];
  for (let state in counties) {
    for (let county of counties[state]) {
      console.log(county.neighbors);
      countiesToAdd.push({
        countyId: county.id,
        state: state,
        name: county.name,
        svgPath: county.path,
        neighbors: county.neighbors,
      });
    }
  }
  // Now, insertMany.
  County.insertMany(countiesToAdd, (err) => {
    if (err) {
      console.log(err);
    } else {
      logDB("Counties populated.");
    }
  });
  res.send("Counties added to database.");
});

module.exports = router;
