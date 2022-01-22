const express = require("express");
const router = express.Router();
var routeCache = require("route-cache");

router.get("/profile", (req, res) => {
  res.status(200).json({ message: "Profile", user: req.user, token: req.query.secret_token });
});

router.get("/navbarLinks", routeCache.cacheSeconds(30), (req, res) => {
  // Check if user is logged in or not.
  if (req.user) {
    var survName = req.user.survivorDetails.survivorName;
    var object = {
      links: [
        {
          name: survName,
          isDropdown: true,
          dropdownLinks: [
            {
              name: "Profile",
              url: "/profile",
            },
            {
              name: "Logout",
              url: "/logout",
            },
          ],
        },
      ],
    };
    res.status(200).json(object);
  }
});

module.exports = router;
