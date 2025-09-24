require('dotenv').config();
const express = require('express');

const session = require('express-session');
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const corsOptions = require('./config/corsOptions.js')
const createError = require('http-errors');

const localizationsRouter = require('./routes/localizations.js');
const vendorsRouter = require('./routes/vendors.js');
const statusesRouter = require('./routes/statuses.js');
const usersRouter = require('./routes/users.js');
const categoriesRouter = require('./routes/categories.js');
const assetsRouter = require('./routes/assets.js');
const app = express();

const db = require('./models'); 

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log('✅ DB connection OK');6
  } catch (err) {
    console.error('❌ DB connection FAIL', err);
    process.exit(1); 
  }
})();

//Authorization
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } 
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/callback", 
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    console.log("✅ Google auth success:", req.user.displayName);
    res.redirect("http://localhost:5173/home");
});


app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(logger(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', localizationsRouter);
app.use('/', vendorsRouter);
app.use('/', statusesRouter);
app.use('/', usersRouter);
app.use('/', categoriesRouter);
app.use('/', assetsRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message });
});

module.exports = app;
