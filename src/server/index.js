const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const { logExpress, logDB } = require("../miscNodeFunctions/logging");
require("dotenv").config();

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
// Cookie Parser
app.use(require("cookie-parser")());
//
require("./auth/auth");
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("connected", function () {
  logDB("DB Connected", true);
});
mongoose.connection.on("error", (error) => console.log(error));
mongoose.Promise = global.Promise;

app.use("/api/auth", require("./routes/authentication"));
app.use("/api/user", passport.authenticate("jwt", { session: false }), require("./routes/user"));

if (process.env.ENVIRONMENT == "PRODUCTION") {
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname + "../../../dist/index.html"));
  });
}

app.listen(process.env.SERVER_PORT, () => {
  logExpress(`Server is running on port ${process.env.SERVER_PORT}`, true);
});
