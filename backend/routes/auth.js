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
    req.session.destroy(() => {
      res.clearCookie('connect.sid')
      res.status(200).json({ message: 'Logged out' })
    })
  })
})

router.post('/dev-login/:uuid', async (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ error: 'DEV only endpoint' });
  }

  try {
    const { uuid } = req.params;

    const user = await User.findByPk(uuid);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    req.login(user, err => {
      if (err) {
        console.error('req.login error:', err);
        return res.status(500).json({ error: 'Login failed' });
      }

      return res.json({
        success: true,
        message: 'Logged in (DEV)',
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      });
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
