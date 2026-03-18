const phoneService = require('../services/phones-service');

module.exports = {

    async getAllPhones(req, res){
            try{
                const phones = await phoneService.getAllPhones(req.query);
                return res.json(phones);
            }catch (err) {
                console.error('Get /phones: ', err);
                return res.status(500).json({error: 'internal_server_error'})
            }
        },
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