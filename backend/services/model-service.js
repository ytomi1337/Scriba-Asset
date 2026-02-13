const { Model, Vendor, Category } = require('../models');

module.exports = {
    async getAll(){
        return Model.findAll({
            include: [
                { model:Vendor, as: 'vendor', attributes:['id', 'name']},
                { model:Category, as: 'category', attributes:['id', 'name']}
            ]
        })
    },

    async create(payload){
        return await Model.create({
            ...payload
        })
    },

    async delete(id){
        return await Model.destroy({
            where: { id: id}
        })
    }
}