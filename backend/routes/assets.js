'use strict';

const express = require('express');
const router = express.Router()

const { Asset, User, Model, Category, Status, Vendor, Localization, Task, TaskAsset } = require('../models');
const { Sequelize, where, ValidationError } = require('sequelize')
const ensureAuthenticated = require('../middleware/isAuthenticated')


router.get('/assets', async(req, res) => {
    try{
        const assets = await Asset.findAll({
            include:[
                { model: User, as: 'user', attributes: [ 'id', 'name', 'position' ]},
                { 
                    model: Model, 
                    as: 'model', 
                    attributes: [ 'id', 'name', 'vendor_id' ],
                    include: [
                        {
                            model: Vendor,
                            as: 'vendor',
                            attributes: ['id', 'name']
                        }
                    ]
                },
                { model: Category, as: 'category', attributes: [ 'id', 'name', 'icon' ]},
                { model: Localization, as: 'localization', attributes: [ 'id', 'name', 'prefix' ]},
                { model: Status, as: 'status', attributes: [ 'id', 'name' ]},
            ]
        })

        return res.status(200).json(assets);
    }catch(err){
        console.error('GET /assets error: ', err);
        return res.status(500).json({ error: 'Server error while fetching assets'})
    }
})
router.get('/assets/info/nextseq', ensureAuthenticated, async (req, res) => {
    try{
        const user = await User.findOne({
            where: { id: req.user.id },
            include: [
                 { model: Localization, as: 'localization', attributes: ['id', 'name', 'prefix']}
            ]
        })

        const lastLocalNum = await Asset.max('sequence', {
            where: {localization_id: user.localization.id}
        })

        return res.status(201).json({
            prefix: user.localization.prefix,
            lastLocalNum: lastLocalNum
            });
    }catch(err){
        console.error('GET /assets/nextSeq error: ', err);
        return res.status(500).json({ error: 'Server error while fetching last Local num'})
    }
})

router.get('/assets/available/:userId', async(req, res) => {
    try{
        const user = await User.findByPk(req.params.userId, {
            attributes: ['localization_id']
        })


        const assets = await Asset.findAll({
            where: [
                {status_id: 3},
            ],
            include:[
                {
                    model: User,
                    as: 'user',
                    attributes: [],
                    where: {
                        localization_id: user.localization_id
                    }
                },
                { 
                    model: Model, 
                    as: 'model', 
                    attributes: [ 'id', 'name', 'vendor_id' ]
                },
                { model: Category, as: 'category', attributes: [ 'id', 'name', 'icon' ]},
                { model: Status, as: 'status', attributes: [ 'id', 'name' ]},
            ]
        })

        return res.status(200).json(assets);
    }catch(err){
        console.error('GET /assets error: ', err);
        return res.status(500).json({ error: 'Server error while fetching assets'})
    }
})
router.get('/assets/:userId', async (req, res) => {
    try{
        const userId = req.params.userId
        const assets = await Asset.findAll({
            where: {user_id: userId},
            include: [
                { model: Model, 
                  as: 'model', 
                  attributes: ['vendor_id', 'name'], 
                  include: [{
                    model: Vendor,
                    as: 'vendor',
                    attributes: ['name']
                  }]
                },
                {model: Status, as:'status', attributes: ['name']},
                {model: Category, as:'category', attributes: ['name', 'icon']}
            ]
        })

        return res.status(200).json(assets);
    }catch(err){
        console.error('GET /assets/user error: ', err);
        return res.status(500).json({ error: 'Server error while fetching user assets'})
    }
})


router.post('/assets', ensureAuthenticated, async (req, res) => {
    try{
        const user = await User.findOne({
            where: { id: req.user.id },
            include: [
                 { model: Localization, as: 'localization', attributes: ['id', 'name', 'prefix']}
            ]
        })

        const lastLocalNum = await Asset.max('sequence', {
            where: {localization_id: user.localization.id}
        })

        const nextSeq = lastLocalNum + 1

        const itNumber = `${user.localization.prefix}-${String(nextSeq).padStart(5, '0')}`;

        const { serial_num , model_id, category_id, status_id, warranty_date} = req.body

        const asset = await Asset.create({
            it_num: itNumber,
            serial_num: serial_num,
            model_id: model_id,
            category_id: category_id,
            status_id: status_id,
            warranty_date: warranty_date || null,
            sequence: nextSeq,
            localization_id: user.localization.id
        })

        return res.status(201).json({
            asset
            });
    }catch (err) {
        if (err instanceof Sequelize.UniqueConstraintError) {
        const fields = err?.errors?.map(e => e.path).join(', ') || 'unique field';
        return res.status(409).json({ error: `Conflict: ${fields} already exists.` });
        }

        console.error('POST /asset error:', err);
        return res.status(500).json({ error: 'Server error while creating asset.' });
    }
})

router.post('/assets/assign', ensureAuthenticated, async (req, res) =>{
    try{
        const assigned_by = req.user.id
        const assigned_to = req.body.user
        const assets_ids = req.body.assets

        console.log(req.body);
        const task = await Task.create({
            assigned_by: assigned_by,
            assigned_to: assigned_to,
            type: 'Assign'
        })

        await Asset.update(
            {   status_id: 2   },
            {   where: {id: assets_ids}}
            )
        for(const assetId of assets_ids){
            await TaskAsset.create({
                task_id: task.id,
                asset_id: assetId
            })
        }
        return res.status(201).json({
            message: 'Asset has been sucesfly assigned to a user ',
            })
    }catch (err){
        console.error('Assign asset to user error:', err)
        return res.status(500).json({
            error: 'internal_server_error',
            details: err.message
        })
    }
})

module.exports = router;
