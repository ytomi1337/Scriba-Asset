const { Phone, Task, Asset, User, Localization, TaskAsset, sequelize } = require('../models')

module.exports = {
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