const { Op } = require('sequelize');
const { Phone, Task, Status, Asset, Model, SimCard, User, Localization, TaskAsset, sequelize } = require('../models')

module.exports = {
    async getAllPhones(query){

        const page = parseInt(query.page) || 1
        const limit = parseInt(query.limit) || 25
        const offset = (page - 1) * limit

        const sortKey = query.sortKey || 'it_num'
        const sortValue = query.sortValue === 'desc' ? 'DESC' : 'ASC'

        // -------------------------
        // Filters
        // -------------------------

        const where = {}
        const modelWhere = { category_id: 9 }
        const phoneWhere = {}
        const simWhere = {}

        // asset filters
        if(query.user){
            where.user_id = query.user
        }

        if(query.model){
            where.model_id = query.model
        }

        // phone filters
        // if(query.imei){
        //     phoneWhere.imei = {
        //         [Op.iLike]: `%${query.imei}%`
        //     }
        // }

        // sim filters
        if(query.nr_tel){
            simWhere.nr = {
                [Op.iLike]: `%${query.nr_tel}%`
            }
        }

        // -------------------------
        // Search (serial + IMEI)
        // -------------------------

        if(query.search){
            where[Op.or] = [
                {
                    serial_num: {
                        [Op.iLike]: `%${query.search}%`
                    }
                },
                {
                    '$phone.imei$': {
                        [Op.iLike]: `%${query.search}%`
                    }
                }
            ]
        }

        const { count, rows } = await Asset.findAndCountAll({
            attributes: ['id', 'it_num', 'serial_num', 'warranty_date', 'recipt_date'],
            where,
            limit,
            offset,
            order: [[sortKey, sortValue]],
            distinct: true,

            include: [
                { model: User, as: 'user', attributes: ['id','name'] },
                { model: Status, as: 'status', attributes: ['id','name'] },
                { model: Localization, as: 'localization', attributes: ['id','name'] },

                {
                    model: Model,
                    as: 'model',
                    attributes: ['id','name'],
                    where: modelWhere,
                },

                {
                    model: Phone,
                    as: 'phone',
                    attributes: ['imei'],
                    required: !!query.nr_tel || !!query.search,
                    where: Object.keys(phoneWhere).length ? phoneWhere : undefined,
                    include: [
                        {
                            model: SimCard,
                            as: 'sim-card',
                            attributes: ['nr'],
                            where: Object.keys(simWhere).length ? simWhere : undefined,
                            required: !!query.nr_tel
                        }
                    ]
                }
            ]
        })

        const data = rows.map(a => ({
            id: a.id,
            it_num: a.it_num,
            serial_num: a.serial_num,

            model: a.model?.name,
            user: a.user?.name,
            status: a.status?.name,

            imei: a.phone?.imei,
            nr_tel: a.phone?.['sim-card']?.nr,

            warranty_date: a.warranty_date,
            recipt_date: a.recipt_date
        }))

        return {
            data,
            meta: {
                total: count,
                page,
                pages: Math.ceil(count / limit),
                limit
            }
        }
    },
    async create(userId, payload){
        return await sequelize.transaction( async (t) => {

            // if (payload.model.category_id != 9){ //nalezy wskazac id kategori telefonu
            //     const err = new Error('Category shoudl be Phone');
            //     err.status = 404;
            //     throw err;
            // }
           
            const user = await User.findOne({
                where: { id: userId },
                include: [
                 { model: Localization, as: 'localization', attributes: ['id', 'name', 'prefix', 'stock_user_id']}
                ], transaction: t
            })

            const lastNum = await Asset.max('sequence', {
                where: { localization_id: user.localization_id },
                transaction: t
            }) || 0

            const nextSeq = lastNum + 1
            const itNum = `${user.localization.prefix}-${String(nextSeq).padStart(5, '0')}`;

            const asset = await Asset.create({
                it_num: itNum,
                serial_num: payload.serial_num,
                // note: payload.note,
                // warranty_date: payload.warranty_date,
                status_id: 3,
                sequence: nextSeq,
                model_id: payload.model_id,
                localization_id: user.localization_id,
                user_id: user.localization.stock_user_id  
            }, { transaction: t })

            const phone = await Phone.create({
                asset_id: asset.id,
                imei: payload.imei,
                sim_card_id: payload.sim_card_id
            }, { transaction: t })

            return phone
        })
    },

    async assign(userId, payload){
        return await sequelize.transaction(async (t) =>{
            const { user, phone } = payload

            const task = await Task.create({
                assigned_by: userId,
                assigned_to: user.id,
                type: 'Assign'
            },{ transaction: t } 
            )

            await Phone.update(
                { status_id: 2 },
                { 
                    where: { id: phone.id },
                    transaction: t
                }
            )

            await TaskAsset.bulkCreate({
                task_id: task.id,
                asset_id: phone.id
                }
            );
        })
    }
}