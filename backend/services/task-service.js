

const { Task, TaskAsset, Asset, Category, Model, Localization, User, Vendor } = require('../models')

module.exports = {
    async getUserTask (userId){
        const include = [
            {
                model: TaskAsset,
                as: 'items',
                include: [
                    {   
                        model: Asset, 
                        as: 'asset',
                        include:[
                            { 
                                model: Model, 
                                as: 'model', 
                                attributes: [ 'id', 'name', 'vendor_id', 'category_id' ],
                                include: [
                                    { model: Vendor, as: 'vendor', attributes: ['id', 'name']},
                                    { model: Category, as: 'category', attributes: ['id', 'name', 'icon']}
                                ]
                            },
                        ]
                    },
                ]
            },
            {   model: User, as: 'assignedBy', attributes: ['id', 'name', 'avatar'] }
        ]

        const finishedTasks = await Task.findAll({
            where: { assigned_to: userId, status: 'Accepted'},
            include
        })
        const pendingTasks = await Task.findAll({
            where: { assigned_to: userId, status: 'Pending'},
            include
        })

        return { pendingTasks, finishedTasks }
    },

    async create (inviterId, payload){
         const { assets_id, type, assigned_to, expires_date} = payload

         const task = await Task.create({
            assigned_by: inviterId,
            assigned_to,
            expires_date,
            type
         })

         await Asset.update (
            { status_id: 2 },
            { where: { id: assets_id }}
         )

         await TaskAsset.bulkCreate(
            assets_id.map(assetId => ({
                task_id: task.id,
                asset_id: assetId
            }))
         )

         return task
    },

    async decide (userId, taskId, decision){
        const task = await Task.findByPk(taskId);

        if(!task){
            const err = new Error('Task not found');
            err.status = 404;
            throw err;
        }

        const user = await User.findOne({
            where: { id: userId },
            include: [
                 { model: Localization, as: 'localization', attributes: ['id', 'name', 'prefix', 'stock_user_id']}
            ]
        })

        if (decision === 'confirm'){
            const taskItems = await TaskAsset.findAll({
                where: { task_id: taskId }
            })

            const assetsIds = taskItems.map(i => i.asset_id)

            if(task.type == 'Assign'){
                await Asset.update(
                    {   user_id: task.assigned_to, status_id: 1},
                    {   where: { id: assetsIds } }
                )
            }

            if(task.type == 'Return'){
                await Asset.update(
                    {   user_id: user.localization.stock_user_id, status_id: 3},
                    {   where: { id: assetsIds } }
                )
            }

            await task.update({
                status: 'Accepted',
                confirmed_at: new Date()
            })
            return {
                success: true,
                task
            };
        }
    },

    async uploadTaskFile (taskId, file){

        if(!file){
            const err = new Error('No file uploaded');
            err.status = 400;
            throw err;
        }

        await Task.update(
            { file: file.filename },
            { where: { id: taskId }}
        )

        return {
                success: true,
                file: file.filename
            };

        

    }
}