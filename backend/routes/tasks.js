'use strict';

const express = require('express');
const router = express.Router()


const ensureAuthenticated = require('../middleware/isAuthenticated')
const taskController = require('../controllers/task-controller')
const uploadTaskFile = require('../middleware/uploadTaskFile')


router.get('/tasks',ensureAuthenticated, taskController.getUserTask)
router.post('/tasks', ensureAuthenticated, taskController.create)
router.post('/tasks/upload', ensureAuthenticated, uploadTaskFile.single('file'), taskController.uploadTaskFile)
router.patch('/task/:id/:decision', ensureAuthenticated, taskController.decide)

module.exports = router;

