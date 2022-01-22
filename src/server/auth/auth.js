const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const userModel = require("../models/User");
const County = require("../models/County");
require("dotenv").config();

var cookieExtractor = function (req) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies["access_token"];
  }
  return token;
};

// Sign Up/Registration strategy. It should take three fields (email, username, password) and create a new user in the database.
// Make sure to handle any errors that may occur. (for example, username not being provided.)
passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        // Make sure survivorName and survivorLocation are provided.
        if (!req.body.survivorName || !req.body.survivorLocation) {
          return done("Please provide a survivor name and location.");
        } else {
          // Validate that survivorLocation exists within the County model.
          var found = await County.findOne({ countyId: req.body.survivorLocation });
          if (!found) {
            return done("Please provide a valid county.");
          }
          var user = await userModel.create({
            email,
            password,
            username: req.body.username,
            survivorDetails: {
              survivorName: req.body.survivorName,
              survivorLocation: req.body.survivorLocation,
            },
          });
          user = await userModel.findOne({ username: req.body.username });
          if (user) {
            return done(null, user, { message: "User created successfully" });
          }
        }
      } catch (error) {
        console.log(error);
        return done("Error creating user. Likely a duplicate unique value like email or username.");
      }
    }
  )
);

// Login Strategy
passport.use(
  "login",
  new localStrategy(
    {
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const user = await userModel.findOne({ username: req.body.username });
        // Combine error messages, as to not let the user know if the username or password is wrong.
        if (!user) {
          return done(null, false, { message: "Incorrect credentials, or user not found." });
        }
        if (!(await user.isValidPassword(password))) {
          return done(null, false, { message: "Incorrect credentials, or user not found." });
        }
        return done(null, user, { message: "Logged in successfully" });
      } catch (error) {
        console.log(error);
        return done(error);
      }
    }
  )
);

const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

// Create a strtagy for the JWT strategy.
// The JWT strategy should take the JWT from the authorization header and extract the user id from it.
// The JWT strategy should then find the user in the database and return it.
// If the user is not found, return false.
// If the user is found, return the user.
passport.use(
  "jwt",
  new JWTstrategy(
    // Extract the JWT from the cookie "access_token"
    {
      secretOrKey: process.env.JWT_SECRET_KEY,
      jwtFromRequest: cookieExtractor,
    },
    async (token, done) => {
      try {
        const user = await userModel.findById(token.user._id);
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        console.log(error);
        done(error);
      }
    }
  )
);

// Strategy to verify that user role is dev.
// If the user is not a dev, return false.
passport.use(
  "isDev",
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET_KEY,
      jwtFromRequest: cookieExtractor,
    },
    async (token, done) => {
      try {
        const user = await userModel.findById(token.user._id);
        if (user.role !== "dev") {
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        console.log(error);
        done(error);
      }
    }
  )
);
