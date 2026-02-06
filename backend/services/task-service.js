
const { Task, TaskAsset, Asset, Category, Model, User } = require('../models')

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
                            { model: Category, as: 'category', attributes: [ 'id', 'name', 'icon' ] },
                            { model: Model, as: 'model', attributes: [ 'id', 'name',]},
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

        if (decision === 'confirm'){
            const taskItems = await TaskAsset.findAll({
                where: { task_id: taskId }
            })

            const assetsIds = taskItems.map(i => i.asset_id)

            await Asset.update(
                {   user_id: task.assigned_to, status_id: 1},
                {   where: { id: assetsIds } }
            )

            await task.update({
                status: 'Accepted',
                confirmed_at: new Date()
            })
            return {
                success: true,
                status: 'Accepted',
                task
            };
        }
    }
}