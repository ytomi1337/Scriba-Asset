const localizationService = require('../services/localization-service');

module.exports = {
    async getAll(req, res){
        try{
            const categories = await localizationService.getAll();
            return res.json(categories);
        }catch (err) {
            console.error('Get /localization: ', err);
            return res.status(500).json({error: 'internal_server_error'})
        }
    },
    async create(req, res){
        try{
            const localization = await localizationService.create(req.body);
            return res.status(201).json(localization);
        }catch (err) {
            console.error('POST /localization: ', err);
            return res.status(500).json({error: 'internal_server_error'})
        }
    },
    async delate(req, res){
        try{
            await localizationService.delete(req.params.id);
            return res.status(201).json({ message: 'Localization deleted'})
        }catch (err) {
            console.error('Delete /localization/id: ', err);
            return res.status(500).json({error: 'internal_server_error'})
        }
    },
}