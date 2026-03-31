const { User, Localization, Task, TaskAsset, Asset} = require('../models')
const { v4: uuidv4 } = require('uuid');


module.exports = {
    async getAll(){
        return await User.findAll({
            include:[
                {   model: Localization, as: 'localization', attributes: ['id', 'name', 'country']}
            ]
        })
    },
    async usersFromLocalization(userId){
        const user = await User.findByPk(userId)

        const regularUsers = await User.findAll({
            where: { 
                localization_id: user.localization_id,
                stock_user: false
            },
            attributes: ['id', 'name']
        })

        //User stock ponizej

        // const stockUsers = await User.findAll({
        //     where: { stock_user: true},
        //     attributes: ['id', 'name']
        // })

        return regularUsers 
    },
    async invite( inviterId, payload){

        const { user, assets } = payload;
        const token = uuidv4();
        const expires = new Date(Date.now() + 30 * 24 * 3600 * 1000); //1 Month

        const [newUser, created] = await User.findOrCreate({
            where: { email: user.email},
            defaults: {
                ...user,
                status: 'invited',
                claim_token: token,
                claim_token_expires_at: expires,
            }
        })

        if (!created) {
            const err = new Error(`User with email: ${user.email} already exists`);
            err.status = 409;       
            throw err;               
        }
        
        if(assets?.length) {
            const task = await Task.create({
                assigned_by: inviterId,
                assigned_to: newUser.id,
                type: 'Assign'
            });

            await Asset.update(
                { status_id: 2, user_id: newUser.id },
                { where: { id: assets } }
            );

            await TaskAsset.bulkCreate(
                assets.map(assetId => ({
                task_id: task.id,
                asset_id: assetId
                }))
            );
        }

        return { status: 'invited', email: newUser.email}
    }
}