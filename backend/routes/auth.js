const express = require("express");
const passport = require("passport");
const router = express.Router();
require("../config/passport");

// Google Login Route
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google Callback Route
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const { token } = req.user; // Extract JWT token from user
    res.redirect(`${process.env.FRONTEND_URL}/dashboard?token=${token}`); // Redirect to frontend with token
  }
);

module.exports = router;


