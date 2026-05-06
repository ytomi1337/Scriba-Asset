const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)

module.exports = (pool) => session({
  store: new pgSession({
    pool,
    createTableIfMissing: true
  }),
  name: 'scriba.sid',
  secret: process.env.SESSION_SECRET || 'dev_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 24 * 60 * 60 * 1000
  }
})