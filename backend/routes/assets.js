'use strict';

const express = require('express');
const router = express.Router()

const { Asset, User, Model, Category, Status, Vendor } = require('../models');
const { Sequelize, where, ValidationError } = require('sequelize')

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
                { model: Category, as: 'category', attributes: [ 'id', 'name' ]},
                { model: Status, as: 'status', attributes: [ 'id', 'name' ]},
            ]
        })

        return res.status(200).json(assets);
    }catch(err){
        console.error('GET /assets error: ', err);
        return res.status(500).json({ error: 'Server error while fetching assets'})
    }
})

router.post('/assets', async (req, res) => {
    console.log('creating asset, user_id=', req.body.user_id)

    try{
        let {
            it_num,
            serial_num,
            note,
            warranty_date,
            category_id,
            license_id,
            status_id,
            user_id,
            model_id,
        } = req.body


        const newAsset = await Asset.create({
            it_num,
            serial_num,
            note,
            warranty_date,
            category_id,
            license_id,
            status_id,
            user_id,
            model_id,
        })
        return res.status(201).json(newAsset);
    }catch (err) {
        if (err instanceof Sequelize.UniqueConstraintError) {
        const fields = err?.errors?.map(e => e.path).join(', ') || 'unique field';
        return res.status(409).json({ error: `Conflict: ${fields} already exists.` });
        }

        console.error('POST /users error:', err);
        return res.status(500).json({ error: 'Server error while creating user.' });
    }
})

module.exports = router;
