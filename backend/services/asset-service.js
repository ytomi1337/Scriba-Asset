const { Op } = require('sequelize');
const { Asset, User, SimCard, Model, Category, Status, Vendor, Phone, Localization, Task, TaskAsset } = require('../models');

module.exports = {
    async getAllAssets(query){

        const page = parseInt(query.page) || 1
        const limit = parseInt(query.limit) || 25
        const offset = (page - 1) * limit

        const sortKey = query.sortKey || 'it_num'
        const sortValue = query.sortValue || 'asc'

        console.log(query);

        //Filters
        const where = {}
        const modelWhere = {}
        
        if(query.status){
            where.status_id = query.status
        }
        if(query.user){
            where.user_id = query.user
        }
        if(query.warranty){
            const today = new Date()
            
            if(query.warranty === 'active'){
                where.warranty_date = {
                    [Op.gt]: today
                }
            }
            
            if(query.warranty === 'expired'){
                where.warranty_date = {
                    [Op.lt]: today
                }
            }
        }
        if(query.model){
            modelWhere.name = query.model
        }
        
        if (query.category) {
         modelWhere.category_id = query.category
        } else {
            modelWhere.category_id = {
            [Op.ne]: 9
        }
        }
        

        //Search
        if(query.search){
            where[Op.or] = [
                {
                    it_num: {
                        [Op.iLike]: `%${query.search}%`
                    },
                },
                {
                    serial_num: {
                        [Op.iLike]: `%${query.search}%`
                    },
                }
            ]
        }

        const { count, rows } = await Asset.findAndCountAll({
            attributes: ['id', 'it_num', 'serial_num', 'warranty_date', 'recipt_date'],
            where,
            limit,
            offset,
            order: [[sortKey, sortValue]],
            // distinct: true, 
            include: [
                { model: User, as: 'user', attributes: [ 'id', 'name' ] },
                { model: Status, as: 'status', attributes: [ 'id', 'name' ] },
                { model: Localization, as: 'localization', attributes: [ 'id', 'name' ] },
                { 
                    model: Model, 
                    as: 'model', 
                    attributes: [ 'id', 'name', 'category_id'],
                    where: Object.keys(modelWhere).length?modelWhere:undefined,
                    include: [
                        { model: Category, as: 'category', attributes: [ 'id', 'name' ] }
                    ]
                },
            ]
        })

        return {
            data: rows,
            meta: {
                total: count,
                page,
                pages: Math.ceil(count / limit),
                limit
            }
        }
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
                { 
                    model: Model, 
                    as: 'model', 
                    attributes: [ 'id', 'name', 'vendor_id', 'category_id' ],
                    include: [
                        { model: Vendor, as: 'vendor', attributes: ['id', 'name']},
                        { model: Category, as: 'category', attributes: ['id', 'name']}
                    ]
                },
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
            where: { 
                user_id: userId,
                status_id: 1
            },
            include: [
                { 
                    model: Model, 
                    as: 'model', 
                    attributes: [ 'id', 'name', 'vendor_id', 'category_id' ],
                    include: [
                        { model: Vendor, as: 'vendor', attributes: ['id', 'name']},
                        { model: Category, as: 'category', attributes: ['id', 'name', 'icon']}
                    ]
                },
                { model: Status, as:'status', attributes: ['id','name']},
                { model: Localization, as:'localization', attributes: ['id','name']},
                
                
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

//dodac wiecej modeli by mozna bylo sprawdzic jak dziala kategoria dokonczyc wyrzucanie danych do tabli phones