const passport = require('passport');
const { User } = require('../models');
const { where } = require('sequelize');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            try{
                let user = await User.findOne({
                    where: {    provider_id: profile.id     }
                });

                if(!user){
                    user = await User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        email_verified: profile.emails[0].verified,
                        provider: profile.provider,
                        provider_id: profile.id,
                        is_active: true
                    })
                }else{
                    user.last_login = new Date();
                    await user.save();
                }
                return done(null, user)
            }catch(err){
                console.error('Error during OAuth login:', err);
                return done(err, null)
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try{
        const user = await User.findByPk(id);
        done(null, user);
    }catch  (err){
        done(err, null)
    }
})
