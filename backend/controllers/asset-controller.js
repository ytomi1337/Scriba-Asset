const assetService = require('../services/asset-service');

module.exports = {
    async getAssets(req, res){
        try{
            const assets = await assetService.getAssets(req.query, req.user.localization_id);
            return res.json(assets);
        }catch (err) {
            console.error('Get /assets: ', err);
            return res.status(500).json({error: 'internal_server_error'})
        }
    },
    async getAsset(req, res){
        try{
            const asset = await assetService.getAsset(req.params.assetId);
            return res.json(asset);
        }catch (err) {
            console.error('Get /asset/:id ', err);
            return res.status(500).json({error: 'internal_server_error'})
        }
    },
    async getStock(req, res){
        try{
            const assets = await assetService.getStock(req.user.localization_id);
            return res.json(assets);
        }catch (err) {
            console.error('Get /assets/stock:', err);
            return res.status(500).json({error: 'internal_server_error'})
        }
    },
    async getNextSequence(req, res){
        try{
            const result = await assetService.getNextSequence(req.user.id);
            console.log(req.user);
            return res.json(result);
        }catch (err) {
            console.error('Get /assets/info/nextseq:', err);
            return res.status(500).json({error: 'internal_server_error'})
        }
    },
    async getUserAssets(req, res){
        try{
            const assets = await assetService.getUserAssets(req.params.userId);
            return res.json(assets);
        }catch (err) {
            console.error('Get /assets/user/:userId:', err);
            return res.status(500).json({error: 'internal_server_error'})
        }
    },
    async getCategoryStats(req, res){
        try{
            const stats = await assetService.getCategoryStats(req.user.localization_id);
            return res.json(stats);
        }catch (err) {
            console.error('GET /assets/stats/categories:', err);
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
            await assetService.assign(req.user.id, req.body);
            return res.status(201).json({ message: 'assigned' });
        }catch (err) {
            console.error('POST /assets/assign:', err);
            return res.status(500).json({error: 'internal_server_error'})
        }
    },
    async returnAsset(req, res){
        try{
            await assetService.returnAsset(req.user.id, req.body);
            return res.status(201).json({ message: 'Returned' });
        }catch (err) {
            console.error('POST /assets/assign:', err);
            return res.status(500).json({error: 'internal_server_error'})
        }
    },

}