const { Vendor } = require('../models');

module.exports = {
    async getAll(){
        return Vendor.findAll()
    },

    async create(payload){
        return await Vendor.create({
            ...payload
        })
    },

    async delete(id){
        return await Vendor.destroy({
            where: { id: id}
        })
    }
}