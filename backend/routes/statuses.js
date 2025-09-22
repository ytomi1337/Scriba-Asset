'use strict';

const express = require('express');
const router = express.Router()

const { Status } = require('../models');
const { Sequelize, where } = require('sequelize')

router.get('/statuses', async(req, res) => {
    try{
        const status = await Status.findAll()

        return res.status(201).json(status)
    }catch( err ){
        return res.status(500).json({ error: err, message: 'A server error has occurred.' })
    }
})

router.post('/statuses', async(req, res) => {
    try{
        const { name } = req.body

        const status = await Status.create({
            name: name, 
        })

        return res.status(201).json(status)
    }catch ( err ){
        if (err instanceof Sequelize.UniqueConstraintError) {
            return res.status(409).json({   error: 'A Status with this name already exists.'} )
        }

        console.error('Failed to create new Status', err);
        return res.status(500).json({   error: 'A server error has occurred.'   })
    }
})

router.delete('/statuses/:id', async(req, res) => {
    try{
        const status = await Status.findOne({
            where: { id: req.params.id }
        })
        await Status.destroy({
            where: { id: req.params.id }
        })

        res.status(201).json({ status, message: `A Status has been deleted successfully` })
    }catch(err){
        console.error('Failed to delete a Status', err);
        return res.status(500).json({   error: 'A server error has occurred.'   })
    }
})

module.exports = router;