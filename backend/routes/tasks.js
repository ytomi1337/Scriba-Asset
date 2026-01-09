'use strict';

const express = require('express');
const router = express.Router()

const { Task, TaskAsset, Asset, User, Category, Model } = require('../models');
const { Sequelize, where } = require('sequelize')
const ensureAuthenticated = require('../middleware/isAuthenticated')


router.get('/tasks',ensureAuthenticated, async(req, res) => {
    try{
        const task = await Task.findAll({
            where: {assigned_to: req.user.id, status: 'Pending'},
            include:[
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
        })

        return res.status(201).json(task)
    }catch( err ){
        return res.status(500).json({ error: err, message: 'A server error has occurred.' })
    }
})

router.post('/tasks', async(req, res) => {
    try{
        const { assets_id, type, assigned_by, assigned_to, expires_date} = req.body

        const task = await Task.create({
            assigned_by: assigned_by,
            assigned_to: assigned_to,
            expires_date: expires_date,
            type: type
        })
        for( const assetId of assets_id){
            
            await Asset.update(
                {   status_id: 2   },
                {   where: {id: assets_id}}
            )
            await TaskAsset.create({
                task_id: task.id,
                asset_id: assetId
            })
        }

        return res.status(201).json(task)
    }catch ( err ){
        if (err instanceof Sequelize.UniqueConstraintError) {
            return res.status(409).json({   error: 'A task with this name already exists.'} )
        }

        console.error('Failed to create new task', err);
        return res.status(500).json({   error: 'A server error has occurred.'   })
    }
})

router.patch('/task/:id/:decision', ensureAuthenticated ,async (req, res) =>{
    const taskId = req.params.id
    const decision = req.params.decision

    try{
        const task = await Task.findByPk(taskId)
        if (!task) return res.status(404).json({ error: "Task not found" });

        if(decision == 'confirm'){
            const taskItems = await TaskAsset.findAll({
                where: {task_id: taskId}
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
            return res.json({ success: true, status: "Accepted", task });
        }
    }catch (err) {
    console.error("PATCH /task/:id/:decision error", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
})

module.exports = router;