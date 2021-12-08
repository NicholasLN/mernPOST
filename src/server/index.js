require("dotenv").config();
const path = require("path");
const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const { logExpress, logDB } = require("../miscNodeFunctions/logging");

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
// Cookie Parser
app.use(require("cookie-parser")());

// Need to do this so that we can load our passport strategies (i.e. signup, login, logout, etc.)
require("./auth/auth");

/// DATABASE ///
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("connected", function () {
  logDB("DB Connected", true);
});
mongoose.connection.on("error", (error) => console.log(error));
mongoose.Promise = global.Promise;
///////////////

/// ROUTES ///
/* Authentication Routes (login, signup, logout) */
app.use("/api/auth", require("./routes/authentication"));
app.use("/api/scripts/counties", require("./routes/scripts/counties"));
/* Private User Routes */
app.use("/api/user", passport.authenticate("jwt", { session: false }), require("./routes/user"));
/* Info Routes */
// County Info
app.use("/api/info/county", require("./routes/main/counties/countyInfo"));

app.use(express.static("build"));
// If we don't do this, the client will not know what to do with the routes
if (process.env.NODE_ENV == "PRODUCTION") {
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname + "../../../build/index.html"));
  });
}

// Finally, we start the server
app.listen(process.env.SERVER_PORT, () => {
  logExpress(`Server is running on port ${process.env.SERVER_PORT}`, true);
});
