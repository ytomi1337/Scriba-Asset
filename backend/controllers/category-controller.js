const cotegoryService = require('../services/category-service');

module.exports = {
    async getAll(req, res){
        try{
            const categories = await cotegoryService.getAll();
            return res.json(categories);
        }catch (err) {
            console.error('Get /categories: ', err);
            return res.status(500).json({error: 'internal_server_error'})
        }
    },
    async create(req, res){
        try{
            const category = await cotegoryService.create(req.body);
            return res.status(201).json(category);
        }catch (err) {
            console.error('POST /categories: ', err);
            return res.status(500).json({error: 'internal_server_error'})
        }
    },
    async delate(req, res){
        try{
            await cotegoryService.delete(req.params.id);
            return res.status(201).json({ message: 'Category deleted'})
        }catch (err) {
            console.error('Delete /categories/id: ', err);
            return res.status(500).json({error: 'internal_server_error'})
        }
    },
}