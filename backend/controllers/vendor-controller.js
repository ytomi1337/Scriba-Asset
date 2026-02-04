const vendorService = require('../services/vendor-service');

module.exports = {
    async getAll(req, res){
        try{
            const vendors = await vendorService.getAll();
            return res.json(vendors);
        }catch (err) {
            console.error('Get /vendors: ', err);
            return res.status(500).json({error: 'internal_server_error'})
        }
    },
    async create(req, res){
        try{
            const vendor = await vendorService.create(req.body);
            return res.status(201).json(vendor);
        }catch (err) {
            console.error('POST /vendors: ', err);
            return res.status(500).json({error: 'internal_server_error'})
        }
    },
    async delate(req, res){
        try{
            await vendorService.delete(req.params.id);
            return res.status(201).json({ message: 'Vendor deleted'})
        }catch (err) {
            console.error('Delete /vendors/id: ', err);
            return res.status(500).json({error: 'internal_server_error'})
        }
    },
}