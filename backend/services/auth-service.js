const { User, Localization } = require('../models');

module.exports = {
    async getProfile(userId){
        return await User.findOne({
            where: { id: userId },
            include: [{ model: Localization, as:'localization', attributes: ['id', 'name'] }]
        })
    },
    async devLogin(uuid, req) {
        const user = await User.findByPk(uuid);

        if (!user) {
        const err = new Error('User not found');
        err.status = 404;
        throw err;
        }

        return new Promise((resolve, reject) => {
        req.login(user, err => {
            if (err) {
            return reject(err);
            }

            resolve({
            success: true,
            message: 'Logged in (DEV)',
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
            });
        });
        });
    }
    
}