'use strict';

const express = require('express');
const router = express.Router()

const { Task, TaskAsset, Asset } = require('../models');
const { Sequelize, where } = require('sequelize')


router.get('/tasks' , async(req, res) => {
    try{
        const { assigned_to, status } = req.query;
        const userId = req.user.id
        const assignedTo = assigned_to === 'me' ? userId : assigned_to;

        const task = await Task.findAll({
            where: {
                assigned_to: assignedTo,
            },
            include:[
                {
                    model: TaskAsset,
                    as: 'items',
                    include: [
                        {   
                            model: Asset, 
                            as: 'asset',
                            attributes: ['id', 'model', 'serial_num']
                        }
                    ]
                }
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


module.exports = router;