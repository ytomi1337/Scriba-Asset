const { User, Localization } = require('../models');

module.exports = {
    async getProfile(userId){
        return await User.findOne({
            where: { id: userId },
            include: [{ model: Localization, as:'localization', attributes: ['id', 'name'] }]
        })
    },
    async devLogin(uuid, req){
        const user = await User.findByPk(uuid)
        
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
    }
    
}