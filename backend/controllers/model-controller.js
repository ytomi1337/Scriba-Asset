const modelService = require('../services/model-service');

module.exports = {
    async getAll(req, res){
        try{
            const models = await modelService.getAll();
            return res.json(models);
        }catch (err) {
            console.error('Get /models: ', err);
            return res.status(500).json({error: 'internal_server_error'})
        }
    },
    async create(req, res){
        try{
            const model = await modelService.create(req.body);
            return res.status(201).json(model);
        }catch (err) {
            console.error('POST /models: ', err);
            return res.status(500).json({error: 'internal_server_error'})
        }
    },
    async delate(req, res){
        try{
            await modelService.delete(req.params.id);
            return res.status(201).json({ message: 'Model deleted'})
        }catch (err) {
            console.error('Delete /models/id: ', err);
            return res.status(500).json({error: 'internal_server_error'})
        }
    },
}