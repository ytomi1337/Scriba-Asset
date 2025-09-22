'use strict';

const express = require('express');
const router = express.Router()

const { Category } = require('../models');
const { Sequelize, where } = require('sequelize')

router.get('/categories', async(req, res) => {
    try{
        const category = await Category.findAll()

        return res.status(201).json(category)
    }catch( err ){
        return res.status(500).json({ error: err, message: 'A server error has occurred.' })
    }
})

router.post('/categories', async(req, res) => {
    try{
        const { name } = req.body

        const category = await Category.create({
            name: name,
        })

        return res.status(201).json(category)
    }catch ( err ){
        if (err instanceof Sequelize.UniqueConstraintError) {
            return res.status(409).json({   error: 'A category with this name already exists.'} )
        }

        console.error('Failed to create new category', err);
        return res.status(500).json({   error: 'A server error has occurred.'   })
    }
})

router.delete('/categories/:id', async(req, res) => {
    try{
        const category = await Category.findOne({
            where: { id: req.params.id }
        })
        await Category.destroy({
            where: { id: req.params.id }
        })

        res.status(201).json({ category, message: `A Category has been deleted successfully` })
    }catch(err){
        console.error('Failed to delete category', err);
        return res.status(500).json({   error: 'A server error has occurred.'   })
    }
})

module.exports = router;