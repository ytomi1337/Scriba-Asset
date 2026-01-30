const authService = require('../services/auth-service');

module.exports = {
    async profile(req,res){
        try{
            const user = await authService.getProfile(req.user.id)
            return res.json({ user })
        }catch (err) {
            console.error('GET /auth/profile:', err);
            return res.status(500).json({ error: 'internal_server_error' });
        }
    },

    async loginPage(req, res) {
        res.send('Nie jesteś zalogowany. <a href="/auth/google">Zaloguj się przez Google</a>');
    },

    async googleCallback(req, res) {
        console.log('✅ Google auth success');
        res.redirect('http://localhost:5173/profile');
    },

    async logout(req, res) {
        req.logout(() => {
            req.session.destroy(() => {
            res.clearCookie('connect.sid');
            res.status(200).json({ message: 'Logged out' });
            });
        });
    },

    async devLogin(req,res){
        try {
            const result = await authService.devLogin(req.params.uuid, req);
            return res.json(result);
        } catch (err) {
            console.error('POST /auth/dev-login:', err);
            return res.status(500).json({ error: 'internal_server_error' });
        } 
    }
}