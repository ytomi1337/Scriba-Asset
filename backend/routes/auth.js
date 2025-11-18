const express = require('express');
const router = express.Router();
const passport = require('passport');
const { User, Localization } = require('../models');
const ensureAuthenticated = require('../middleware/isAuthenticated')

router.get("/auth/google", 
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get('/auth/profile', ensureAuthenticated, async (req, res) => {
  try{
    const user = await User.findOne({
       where: { id: req.user.id },
        include: [
          {
            model: Localization,
            as: 'localization',
            attributes: ['id', 'name']
          }
        ]
    })
    res.send({ user })
  }catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).send({ error: "Internal server error" });
  }
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
