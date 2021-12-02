const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const userModel = require("../models/User");
require("dotenv").config();

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
        const user = await userModel.create({ email, password, username: req.body.username });
        return done(null, user, { message: "User created successfully" });
      } catch (error) {
        done("Error creating user. Likely a duplicate unique value like email or username.");
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
        if (!user.isValidPassword(password)) {
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

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET_KEY,
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token"),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        console.log(error);
        done(error);
      }
    }
  )
);
