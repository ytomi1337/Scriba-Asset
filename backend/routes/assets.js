'use strict';

const express = require('express');
const router = express.Router()

const { Asset, User, Vendor, Category, Status } = require('../models');
const { Sequelize, where, ValidationError } = require('sequelize')

router.get('/assets', async(req, res) => {
    try{
        const assets = await Asset.findAll({
            include:[
                { model: User, as: 'user', attributes: [ 'id', 'name', 'position' ]},
                { model: Vendor, as: 'vendor', attributes: [ 'id', 'name' ]},
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
    try{
        let {
            name,
            it_num,
            serial_num,
            note,
            warranty_date,
            category_id,
            license_id,
            status_id,
            user_id,
            vendor_id
        } = req.body


        const checkFk = async (model, id, label) =>{
            if (id != null){
                const object = await model.findByPk(id)

                if(!object){
                    return res.status(400).json({ error: `${label} with id: ${id} dose not exist`})
                }
            }
        }

        name = name.trim();
        it_num = it_num.trim();
        serial_num = it_num.trim();
        note = note ?? null;
        warranty_date = warranty_date ? new Date(warranty_date) : null

        await checkFk(Category, category_id, 'Category')
        await checkFk(Status, status_id, 'Status')
        await checkFk(User, user_id, 'User')
        await checkFk(Vendor, vendor_id, 'Vendor')

        category_id = category_id ?? null
        status_id = status_id ?? null
        user_id = user_id ?? null
        vendor_id = vendor_id ?? null
        license_id = license_id ?? null


        const newAsset = await Asset.create({
            name,
            it_num,
            serial_num,
            note,
            warranty_date,
            category_id,
            license_id,
            status_id,
            user_id,
            vendor_id,
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
