const phoneService = require('../services/phones-service');

module.exports = {
    async create(req, res){
        try{
            const phone = await phoneService.create(req.user.id, req.body);
            return res.status(201).json(phone);
        }catch (err) {
            console.error('POST /create: ', err);
            return res.status(500).json({error: 'internal_server_error'})
        }
    },
    async assign(req, res){
        try{
            await phoneService.assign(req.user.id, req.body);
            return res.status(201).json({ message: 'assigned' });
        }catch (err) {
            console.error('POST /phones/assign:', err);
            return res.status(500).json({error: 'internal_server_error'})
        }
    },

}