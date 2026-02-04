const { Status } = require('../models');

module.exports = {
    async getAll(){
        return Status.findAll()
    },

    async create(payload){
        return await Status.create({
            ...payload
        })
    },

    async delete(id){
        return await Status.destroy({
            where: { id: id}
        })
    }
}