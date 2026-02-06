'use strict';

const express = require('express');
const router = express.Router()


const ensureAuthenticated = require('../middleware/isAuthenticated')
const taskController = require('../controllers/task-controller')


router.get('/tasks',ensureAuthenticated, taskController.getUserTask)
router.post('/tasks', ensureAuthenticated, taskController.create)
router.patch('/task/:id/:decision', ensureAuthenticated, taskController.decide)

module.exports = router;

