const userService = require('../services/user-service')

module.exports = {
    async getAll (req, res) {
        try{
            const users = await userService.getAll()
            return res.json(users)
        }catch (err) {
            console.error('Get /users: ', err);
            return res.status(500).json({error: 'internal_server_error'})
        }
    },
    
    async invite (req, res){
        try{
            const user = await userService.invite(req.user.id, req.body);
            return res.json(user);
        }catch (err) {
            console.error('Post /create: ', err);

            if (err.status) {
                return res.status(err.status).json({
                    error: {
                        message: err.message
                    }
                });
            }

            return res.status(500).json({error: 'internal_server_error'})
        }
    }
}