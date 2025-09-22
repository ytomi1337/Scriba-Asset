'use strict';

const express = require('express');
const router = express.Router()

const { Localization } = require('../models');
const { Sequelize, where } = require('sequelize')

router.get('/localizations', async(req, res) => {
    try{
        const localization = await Localization.findAll()

        return res.status(201).json(localization)
    }catch( err ){
        return res.status(500).json({ error: err, message: 'A server error has occurred.' })
    }
})

router.post('/localizations', async(req, res) => {
    try{
        const { name, country, company_code } = req.body

        const localization = await Localization.create({
            name: name,
            country: country,
            company_code: company_code,
        })

        return res.status(201).json(localization)
    }catch ( err ){
        if (err instanceof Sequelize.UniqueConstraintError) {
            return res.status(409).json({   error: 'A location with this name or Company Code already exists.'} )
        }

        console.error('Failed to create localization', err);
        return res.status(500).json({   error: 'A server error has occurred.'   })
    }
})

router.delete('/localizations/:id', async(req, res) => {
    try{
        const localization = await Localization.findOne({
            where: { id: req.params.id }
        })
        await Localization.destroy({
            where: { id: req.params.id }
        })

        res.status(201).json({ localization, message: `Localization has been deleted successfully` })
    }catch(err){
        console.error('Failed to delete localization', err);
        return res.status(500).json({   error: 'A server error has occurred.'   })
    }
})

module.exports = router;