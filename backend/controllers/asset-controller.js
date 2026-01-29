const assetService = require('../services/asset-service');

module.exports = {
    async getAll(req, res){
        try{
            const assets = await assetService.getAll();
            return res.json(assets);
        }catch (err) {
            console.error('Get /assets: ', err);
            return res.status(500).json({error: 'internal_server_error'})
        }
    },

    async getStock(req, res){
        try{
            const assets = await assetService.getStock(req.user.id);
            return res.json(assets);
        }catch (err) {
            console.error('Get /assets/stock:', err);
            return res.status(500).json({error: 'internal_server_error'})
        }
    },

    async getNextSequence(req, res){
        try{
            const result = await assetService.getNextSequence(req.user.id);
            return res.json(result);
        }catch (err) {
            console.error('Get /assets/info/nextseq:', err);
            return res.status(500).json({error: 'internal_server_error'})
        }
    },
    async getUserAssets(req, res){
        try{
            const assets = await assetService.getUserAssets(req.user.id);
            return res.json(assets);
        }catch (err) {
            console.error('Get /assets/user:', err);
            return res.status(500).json({error: 'internal_server_error'})
        }
    },
    async create(req, res){
        try{
            const asset = await assetService.create(req.user.id, req.body);
            return res.status(201).json(asset);
        }catch (err) {
            console.error('POST /assets:', err);
            return res.status(500).json({error: 'internal_server_error'})
        }
    },
    async assign(req, res){
        try{
            const asset = await assetService.assign(req.user.id, req.body);
            return res.status(201).json({ message: 'assigned' });
        }catch (err) {
            console.error('POST /assets/assign:', err);
            return res.status(500).json({error: 'internal_server_error'})
        }
    },

}