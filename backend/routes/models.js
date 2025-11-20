'use strict';

const express = require('express');
const router = express.Router()

const { Model, Vendor } = require('../models');
const { Sequelize, where } = require('sequelize')

router.get('/models', async (req,res) => {
    try{
        const models = await Model.findAll({
            include: [
                { model:Vendor, as: 'vendor', attributes:['id', 'name']}
            ]
        })
        return res.status(200).json(models);
    }catch(err){
        console.error('GET /models error: ', err);
        return res.status(500).json({ error: 'Server error while fetching models'})
    }
})

router.post('/models', async (req,res) => {
    try {

        const { name, vendor_id } = req.body
        const model = await Model.create({
            name: name,
            vendor_id: vendor_id
        })
        return res.status(201).json(model)
    }catch ( err ){
        if (err instanceof Sequelize.UniqueConstraintError) {
            return res.status(409).json({   error: 'A Model with this name already exists.'} )
        }
        console.error('Failed to create new Model', err);
        return res.status(500).json({   error: 'A server error has occurred.'   })
    }
})

module.exports = router;