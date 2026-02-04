const express = require('express');
const router = express.Router();
const passport = require('passport');

const ensureAuthenticated = require('../middleware/isAuthenticated')
const authController = require('../controllers/auth-controller');

router.get("/auth/google", 
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/auth/google/callback", 
  passport.authenticate("google", { failureRedirect: "/auth/login" }),
  authController.googleCallback);

router.get('/auth/profile', ensureAuthenticated, authController.profile )
router.get('/auth/login', authController.loginPage)
router.get('/auth/logout', authController.logout)

router.post('/dev-login/:uuid', authController.devLogin);


module.exports = router;
