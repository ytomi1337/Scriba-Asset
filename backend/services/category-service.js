const { Category } = require('../models');

module.exports = {
    async getAll(){
        return Category.findAll()
    },

    async create(payload){
        return await Category.create({
            ...payload
        })
    },

    async delete(id){
        return await Category.destroy({
            where: { id: id}
        })
    }
}