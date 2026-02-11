const { Phone } = require('../models')

module.exports = {
    async create(payload){
        return await Phone.create({
            ...payload
        })
    }
}