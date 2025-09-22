'use strict';

const express = require('express');
const router = express.Router()

const { User, Localization } = require('../models');
const { Sequelize, where, ValidationError } = require('sequelize')

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

router.post('/users', async (req, res) => {
    try{
        let {
            name,
            role,
            email,
            provider_id,
            metadata,
            manager,
            position,
            department,
            holcim_code,
            localization_id
        } = req.body

        name = name.trim();
        role = role.trim();
        email = email ? String(email).trim() : null;
        provider_id = provider_id ? String(provider_id).trim() : null;
        manager = manager ? String(manager).trim() : null;
        position = position ? String(position).trim() : null;
        department = department ? String(department).trim() : null;
        holcim_code = holcim_code ? String(holcim_code).trim() : null;
        metadata = metadata ?? null;

        if(localization_id != null){
            const localization = await Localization.findByPk(localization_id);
            if (!localization){
                return res.status(400).json({ error: `Localization with id: ${localization_id} dose not exist`})
            }
        }

        const newUser = await User.create({
            name,
            role,
            email,
            provider_id,
            metadata,
            manager,
            position,
            department,
            holcim_code,
            localization_id,
        })

        return res.status(201).json(newUser);
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
