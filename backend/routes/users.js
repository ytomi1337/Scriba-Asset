'use strict';

const express = require('express');
const router = express.Router()

const { v4: uuidv4 } = require('uuid');
const { User, Localization, TaskAsset, Task, Asset } = require('../models');
const { Sequelize, where, ValidationError, Op } = require('sequelize')

router.get('/users', async(req, res) => {
    try{
        const users = await User.findAll({
            include:[
                { model: Localization, as: 'localization', attributes: ['id', 'name', 'country']}
            ]
        })

        return res.status(200).json(users);
    }catch(err){
        console.error('GET /users error: ', err);
        return res.status(500).json({ error: 'Server error while fetching users'})
    }
})

router.post('/createUser', async (req, res) => {
    
    try {
        let {
            name,
            email,
            localization_id
        } = req.body.user

        if (localization_id != null){
            const localization = await Localization.findByPk(localization_id);
            if(!localization){
                return res.status(400).json({   error: `Localization with id: ${localization_id} dose not exist!`})
            }
        }
        const token = uuidv4();
        const expires = new Date(Date.now() + 30 * 24 * 3600 * 1000);
        const [newUser, created] = await User.findOrCreate({
            where: { email: email },
            defaults: {
                name,
                status: 'invited',
                claim_token: token,
                claim_token_expires_at: expires,
                localization_id: Number(localization_id) || null,
            },
        })
        if(!created){
                return res.status(409).json({
                    error: {
                        code: 'USER_ALREADY_EXISTS',
                        message: `User with email ${email} already exists !`,
                        user: {
                            id: newUser.id,
                            email: newUser.email,
                            status: newUser.status
                        },
                    },
                })
            }

        try{
            const assigned_by = req.user.id
            const assigned_to = newUser.id
            const assets_ids = req.body.assets

            const task = await Task.create({
                assigned_by: assigned_by,
                assigned_to: assigned_to,
                type: 'Assign'
            })
            for(const assetId of assets_ids){
                await Asset.update(
                {   status_id: 2   },
                {   where: {id: assetId}}
                )
                await TaskAsset.create({
                    task_id: task.id,
                    asset_id: assetId
                })
            }

            return res.status(201).json({
            message: 'User placeholder created',
            })
        }catch(err){
            console.error('Create user placeholder error:', err)
            return res.status(500).json({
                error: 'internal_server_error',
                details: err.message
        })
        }

    }catch (err){
        console.error('Create user placeholder error:', err)
        return res.status(500).json({
            error: 'internal_server_error',
            details: err.message
        })
    }
})
module.exports = router;
