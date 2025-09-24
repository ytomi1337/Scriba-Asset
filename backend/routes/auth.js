const express = require('express');
const router = express.Router();
const passport = require('../config/passport');

router.get("/auth/google",passport.authenticate('google', {scope: ["profile", "email"]}))

router.get("/auth/google/callback", passport.authenticate('google', {
  failureRedirect: "/home"}), (req, res) => {
    res.redirect('/profile')
  }
)

router.get("/profile", (req, res) => {
  res.send (`Welcome ${req.user.displayName}`)
})

router.get("/logout", (req,res) => {
  req.logOut();
  res.redirect('/home');
})


module.exports = router;
