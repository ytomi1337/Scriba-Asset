require('dotenv').config();
require('./config/passport.js');
const express = require('express');

const session = require('express-session');
const passport = require('passport')


const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const corsOptions = require('./config/corsOptions.js')
const createError = require('http-errors');

const localizationsRouter = require('./routes/localizations.js');
const tasksRouter = require('./routes/tasks.js')
const simCardRouter = require('./routes/simCards.js')
const modelRouter = require('./routes/models.js')
const vendorsRouter = require('./routes/vendors.js');
const statusesRouter = require('./routes/statuses.js');
const phoneRouter = require('./routes/phones.js')
const usersRouter = require('./routes/users.js');
const categoriesRouter = require('./routes/categories.js');
const assetsRouter = require('./routes/assets.js');
const authRouter = require('./routes/auth.js')



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

app.use(cors(corsOptions));
app.use(logger(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', localizationsRouter);
app.use('/', tasksRouter);
app.use('/', vendorsRouter);
app.use('/', simCardRouter);
app.use('/', statusesRouter);
app.use('/', phoneRouter);
app.use('/', usersRouter);
app.use('/', categoriesRouter);
app.use('/', assetsRouter);
app.use('/', modelRouter);
app.use('/', authRouter);
app.use('/uploads', express.static('uploads'))


app.use(function(req, res, next) {
  next(createError(404));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message });
});

module.exports = app;
