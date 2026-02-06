'use strict';

const express = require('express');
const router = express.Router()
const ensureAuthenticated = require('../middleware/isAuthenticated')

const userController = require('../controllers/user-controller')

router.get('/users', userController.getAll)
router.get('/users/usersFromLocalization', userController.usersFromLocalization)
router.post('/invite',ensureAuthenticated ,userController.invite)

module.exports = router;
