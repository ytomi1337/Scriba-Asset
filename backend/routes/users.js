'use strict';

const express = require('express');
const router = express.Router()

const { v4: uuidv4 } = require('uuid');
const { User, Localization } = require('../models');
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
            role,
            provider,
            provider_id,
            manager,
            position,
            department,
            holcim_code,
            localization_id
        } = req.body

        if (localization_id != null){
            const localization = await Localization.findByPk(localization_id);
            if(!localization){
                return res.status(400).json({   error: `Localization with id: ${localization_id} dose not exist!`})
            }
        }

        //Existing check
        // const existing = await User.findOne({
        //     where: {
        //         [Op.or]: [
        //             holcim_code ? { holcim_code } : null,
        //             email ? { email } : null
        //         ].filter(Boolean)
        //     }
        // })

        //If user already exist and have status 'active' give info, no update
        // if (existing){
        //     if(existing.status === 'active'){
        //         return res.status(409).json({  error: 'User already exists', user: {
        //             id: existing.id,
        //             email: existing.email,
        //             holcim_code: existing.holcim_code
        //         }})
        //     }

        //     if(existing.status === 'invited'){
        //         const token = uuidv4();
        //         const expires = new Date(Date.now() + 30 * 24 * 3600 * 1000); // 30 dni
        //         await existing.update({
        //             name,
        //             provider,
        //             provider_id,
        //             claim_token: token,
        //             claim_token_expires_at: expires
        //         })
        //         return res.status(200).json({ message: 'User updated', user: {
        //             id: existing.id,
        //             email: existing.email,
        //             holcim_code: existing.holcim_code,
        //             },
        //             claim_token: token,
        //             claim_token_expires_at: expires   
        //         })
        //     }
            
        // }
        const token = uuidv4();
        const expires = new Date(Date.now() + 30 * 24 * 3600 * 1000); // 30 dni
        const [newUser, created] = await User.findOrCreate({
            where: { email: "laniocha123@gmail.com" },
            defaults: {
                name,
                holcim_code: holcim_code || null,
                department: department || null,
                position: position || null,
                provider_id: "123",
                manager: manager || null,
                status: 'invited',
                claim_token: token,
                claim_token_expires_at: expires
            },
        })

        if(!created){
                return res.status(409).json({
                    error: {
                        message: 'User aleady Created',
                        user: {
                            id: newUser.id,
                            email: newUser.email,
                            holcim_code: newUser.holcim_code,
                            department: newUser.department,
                            position: newUser.position,
                            manager: newUser.manager,
                            status: newUser.status
                        },
                    },
                })
            }
            return res.status(201).json({
            message: 'User placeholder created',
            user: {
                id: newUser.id,
                email: newUser.email,
                holcim_code: newUser.holcim_code,
                department: newUser.department,
                position: newUser.position,
                manager: newUser.manager,
                status: newUser.status
            },
            claim_token: token,
            claim_token_expires_at: expires
            })
        // const token = uuidv4();
        // const expires = new Date(Date.now() + 30 * 24 * 3600 * 1000); // 30 dni
        
        // const newUser = await User.create({
        //     name,
        //     email: email || null,
        //     provider_id: "123",
        //     holcim_code: holcim_code || null,
        //     department: department || null,
        //     position: position || null,
        //     manager: manager || null,
        //     status: 'invited',
        //     claim_token: token,
        //     claim_token_expires_at: expires
        // })

        // return res.status(201).json({
        //     message: 'User placeholder created',
        //     user: {
        //         id: newUser.id,
        //         email: newUser.email,
        //         holcim_code: newUser.holcim_code,
        //         department: newUser.department,
        //         position: newUser.position,
        //         manager: newUser.manager,
        //         status: newUser.status
        //     },
        //     claim_token: token,
        //     claim_token_expires_at: expires
        // })
    }catch (err){
        console.error('Create user placeholder error:', err)
        return res.status(500).json({
            error: 'internal_server_error',
            details: err.message
        })
    }
})
module.exports = router;
