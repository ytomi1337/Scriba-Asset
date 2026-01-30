const { Asset, User, Model, Category, Status, Vendor, Localization, Task, TaskAsset } = require('../models');

module.exports = {
    async getAll(){
        return await Asset.findAll({
            include: [
                { model: User, as: 'user', attributes: [ 'id', 'name' ]},
                { 
                    model: Model, 
                    as: 'model', 
                    attributes: [ 'id', 'name', 'vendor_id' ],
                    include: [{ model: Vendor, as: 'vendor', attributes: ['id', 'name']}]
                },
                { model: Category, as: 'category', attributes: [ 'id', 'name', 'icon' ]},
                { model: Localization, as: 'localization', attributes: [ 'id', 'name', 'prefix' ]},
                { model: Status, as: 'status', attributes: [ 'id', 'name' ]},
            ]
        })
    },
    async getStock(userId){
        const user = await User.findByPk(userId, { attributes: ['localization_id'] })

        return await Asset.findAll({
            where: { status_id: 3 },
            include:[
                {
                    model: User,
                    as: 'user',
                    attributes: [],
                    where: { localization_id: user.localization_id }
                },
                { model: Model, as: 'model', attributes: [ 'id', 'name',] },
                { model: Category, as: 'category', attributes: [ 'id', 'name', 'icon' ]},
                { model: Status, as: 'status', attributes: [ 'id', 'name' ]},
            ]
        });
    },
    async getNextSequence(userId){
        const user = await User.findOne({
            where: { id: userId},
            include: [{ model: Localization, as: 'localization', attributes: ['id', 'name', 'prefix'] }]
        })

        const lastNum = await Asset.max('sequence', {
            where: { localization_id: user.localization_id }
        })

        return{
            prefix: user.localization.prefix,
            lastLocalNum: lastNum || 0
        }
    },
    async getUserAssets(userId){
        return await Asset.findAll({
            where: { user_id: userId},
            include: [
                { model: Model, as: 'model', attributes: ['vendor_id', 'name'], 
                  include: [{ model: Vendor, as: 'vendor', attributes: ['name'] }]
                },
                { model: Status, as:'status', attributes: ['name']},
                { model: Category, as:'category', attributes: ['name', 'icon']}
            ]
        })
    },
    async create(userId, payload){
        const user = await User.findOne({
            where: { id: userId },
            include: [
                 { model: Localization, as: 'localization', attributes: ['id', 'name', 'prefix', 'stock_user_id']}
            ]
        })

        const lastNum = await Asset.max('sequence', {
            where: {localization_id: user.localization.id}
        }) 

        const nextSeq = lastNum + 1
        const itNum = `${user.localization.prefix}-${String(nextSeq).padStart(5, '0')}`;

        return Asset.create({
            ...payload,
            it_num: itNum,
            sequence: nextSeq,
            localization_id: user.localization.id,
            user_id: user.localization.stock_user_id
        })
    },
    async assign(assignedBy, payload){
        const { user, assets } = payload

        const task = await Task.create({
            assigned_by: assignedBy,
            assigned_to: user,
            type: 'Assign'
        })

        await Asset.update(
            { status_id: 2, user_id: user},
            { where: { id: assets }}
        )

        await TaskAsset.bulkCreate(
            assets.map(id => ({ task_id: task.id, asset_id: id }))
        );
    }
    
}