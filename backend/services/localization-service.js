const { Localization } = require('../models');

module.exports = {
    async getAll(){
        return Localization.findAll()
    },

    async create(payload){
        return await Localization.create({
            ...payload
        })
    },

    async delete(id){
        return await Localization.destroy({
            where: { id: id}
        })
    }
}