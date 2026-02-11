const { SimCard } = require('../models')

module.exports = {
    async create(payload){
        return await SimCard.create({
            ...payload
        })
    }
}