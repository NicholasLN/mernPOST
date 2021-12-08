const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { logDB, logGame } = require("../../miscNodeFunctions/logging");
const router = express.Router();
require("dotenv").config();

// Middleware for verifying the JWT token
const authorization = (req, res, next) => {
  const token = req.cookies.access_token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401).json({
          message: "Invalid Token",
          error: err,
        });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } else {
    res.status(401).send("Unauthorized");
  }
};

/**
 * @api {post} /auth/signup Signup
 * @apiName Signup
 * @apiGroup Authentication
 * @apiVersion 1.0.0
 * @apiDescription Signs up a user.
 *
 * @apiParam {String} email Email of the user.
 * @apiParam {String} password Password of the user.
 * @apiParam {String} username Username of the user.
 */
router.post("/signup", async (req, res, next) => {
  passport.authenticate("signup", async (err, user, info) => {
    if (err) {
      return res.status(500).json({
        message: err,
      });
    }
    if (!user) {
      return res.status(400).json({
        message: err,
      });
    }
    req.login(user, { session: false }, async (err) => {
      if (err) {
        return res.status(500).json({
          message: err,
        });
      }
      res.status(200).json({
        message: "Successfully Signed Up",
        user: user,
      });
      logGame(`${user.username} signed up.`, true);
    });
  })(req, res, next);
});

/**
 * @api {post} /auth/login Login
 * @apiName Login
 * @apiGroup Authentication
 * @apiVersion 1.0.0
 * @apiDescription This route is used to login a user.
 *
 * @apiParam {String} username The username of the user.
 * @apiParam {String} password The password of the user.
 * @apiParam {String} [rememberMe] If the user wants to be remembered.
 */
router.post("/login", async (req, res, next) => {
  // Check if the user is already logged in. If they are, don't do anything.
  if (req.cookies.access_token) {
    return res.status(200).json({ message: "Already logged in" });
  }
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        // Send an error message with the "message" property in info.
        return res.status(400).json({
          message: info.message,
        });
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        const body = { _id: user._id, email: user.email, username: user.username, role: user.role };
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET_KEY);
        // Set cookie.
        // If rememberMe is true, set the cookie to expire in 7 days. Otherwise, set it to expire in 1 day.
        if (req.body.rememberMe) {
          res.cookie("access_token", token, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: true, secure: process.env.NODE_ENV === "production" });
        } else {
          res.cookie("access_token", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, sameSite: true, secure: process.env.NODE_ENV === "production" });
        }
        logGame(`${user.username} logged in. IP: ${req.ip}`, true);
        return res.status(200).json({
          message: "Login successful",
          body: body,
        });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

/**
 * @api {get} /auth/logout Logout
 * @apiName Logout
 * @apiGroup Authentication
 * @apiVersion 1.0.0
 * @apiDescription This route is used to logout a user.
 *
 */
router.get("/logout", authorization, async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.json({
      message: "Logout successful",
    });
    logGame(`${req.user.username} logged out. IP: ${req.ip}`, true);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
