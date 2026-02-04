const statusService = require('../services/status-service');

module.exports = {
    async getAll(req, res){
        try{
            const statuses = await statusService.getAll();
            return res.json(statuses);
        }catch (err) {
            console.error('Get /statuses: ', err);
            return res.status(500).json({error: 'internal_server_error'})
        }
    },
    async create(req, res){
        try{
            const status = await statusService.create(req.body);
            return res.status(201).json(status);
        }catch (err) {
            console.error('POST /statuses: ', err);
            return res.status(500).json({error: 'internal_server_error'})
        }
    },
    async delate(req, res){
        try{
            await statusService.delete(req.params.id);
            return res.status(201).json({ message: 'Status deleted'})
        }catch (err) {
            console.error('Delete /statuses/id: ', err);
            return res.status(500).json({error: 'internal_server_error'})
        }
    },
}