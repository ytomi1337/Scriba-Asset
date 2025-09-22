'use strict';

const express = require('express');
const router = express.Router()

const { Vendor } = require('../models');
const { Sequelize, where } = require('sequelize')

router.get('/vendors', async(req, res) => {
    try{
        const vendor = await Vendor.findAll()

        return res.status(201).json(vendor)
    }catch( err ){
        return res.status(500).json({ error: err, message: 'A server error has occurred.' })
    }
})

router.post('/vendors', async(req, res) => {
    try{
        const { name, address } = req.body

        const vendor = await Vendor.create({
            name: name,
            address: address,
            
        })

        return res.status(201).json(vendor)
    }catch ( err ){
        if (err instanceof Sequelize.UniqueConstraintError) {
            return res.status(409).json({   error: 'A Vendor with this name already exists.'} )
        }

        console.error('Failed to create new Vendor', err);
        return res.status(500).json({   error: 'A server error has occurred.'   })
    }
})

router.delete('/vendors/:id', async(req, res) => {
    try{
        const vendor = await Vendor.findOne({
            where: { id: req.params.id }
        })
        await Vendor.destroy({
            where: { id: req.params.id }
        })

        res.status(201).json({ vendor, message: `A Vendor has been deleted successfully` })
    }catch(err){
        console.error('Failed to delete a Vendor', err);
        return res.status(500).json({   error: 'A server error has occurred.'   })
    }
})

module.exports = router;