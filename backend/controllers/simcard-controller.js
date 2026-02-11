const simCardService = require('../services/simcards-service');

module.exports = {
    async create(req, res){
        try{
            const simCard = await simCardService.create(req.body);
            return res.status(201).json(simCard);
        }catch (err) {
            console.error('POST /crate: ', err);
            return res.status(500).json({error: 'internal_server_error'})
        }
    },

}