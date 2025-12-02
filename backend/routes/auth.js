const express = require('express');
const router = express.Router();
const passport = require('passport');
const { User, Localization, Asset, Model, Vendor, Status, Category, TaskAsset, Task } = require('../models');
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
    const assets = await Asset.findAll({
      where: { user_id: req.user.id},
      include: [
        { model: Model, 
          as: 'model', 
          attributes: ['vendor_id','name'],
          include: [{
            model: Vendor,
            as: 'vendor',
            attributes: ['name']
          }]
        },
        { model: Status, as: 'status', attributes: ['name']},
        { model: Category, as: 'category', attributes: ['name', 'icon']},
      ]
    })

    res.send({ user, assets })
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
