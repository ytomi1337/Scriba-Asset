const passport = require('passport');
const { User } = require('../models');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK || '/auth/google/callback'
        },
        async (accessToken, refreshToken, profile, done) => {
            try{
                const googleEmail = profile.emails?.[0]?.value;

                if (!googleEmail) {
                    return done(null, false);
                }
                
                const user = await User.findOne({ where: {
                    email: googleEmail,
                }})

                if (!user) {
                    return done(null, false);
                }

                if(user.status === 'invited'){
                    await user.update({
                        name: profile.displayName,
                        provider_id: profile.id,
                        provider: 'google',
                        email_verified: true,
                        status: 'active',
                        claim_token: null,
                        claim_token_expires_at: null,
                        last_login: new Date(),
                        avatar: profile.photos?.[0]?.value || null
                    })

                    return done(null, user);
                }

                if(user.status === 'active'){
                    await user.update({
                        last_login: new Date()
                    })

                    return done(null, user);
                }

                return done(null, false);

                //     const user = await User.findOne({ where: {
                //         email: googleEmail,
                //         status: 'invited'
                //         }
                //     })
                //     if (user){
                //         await user.update({
                //             name: profile.displayName,
                //             provider_id: profile.id,
                //             provider: 'google',
                //             email_verified: true,
                //             status: 'active',
                //             claim_token: null,
                //             claim_token_expires_at: null,
                //             last_login: new Date(),
                //             avatar: profile.photos[0].value
                //         })
                //         return done(null, user);
                //     }
                // }                

                // if(googleEmail){
                //     const user = await User.findOne({ where: {
                //         email: googleEmail,
                //         status: 'active'
                //     }})
                //     if(user){
                //         await user.update({
                //             last_login: new Date()
                //         })
                //         return done(null, user);
                //     }
                // }   
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
