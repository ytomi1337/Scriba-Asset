const express = require('express');
const router = express.Router();
const passport = require('passport');
const ensureAuthenticated = require('../middleware/isAuthenticated')
router.get("/auth/google", 
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get('/auth/profile', ensureAuthenticated, (req, res) => {
  const user = req.user

  res.send({ user })
});

router.get('/auth/login', (req, res) => {
    res.send('Nie jesteś zalogowany. <a href="/auth/google">Zaloguj się przez Google</a>');
})

router.get("/auth/google/callback", 
  passport.authenticate("google", { failureRedirect: "/auth/login" }),
  (req, res) => {
    console.log("✅ Google auth success:");
    res.redirect("http://localhost:5173/profile");
});

router.get('/auth/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/auth/login');
  });
});


module.exports = router;
