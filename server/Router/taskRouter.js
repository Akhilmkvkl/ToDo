const mongoose = require('mongoose')
const Task = require('../model/taskModel')
const express = require('express');
const { createTask, GetTask, getTask, deleteTask, updateTask } = require('../Controller/taskController');
const router = express.Router();


router.post('/api/task',createTask)
router.get('/api/task',GetTask)
router.get('/api/task/:id',getTask)
router.delete('/api/task/:id',deleteTask)
router.put('/api/task/:id',updateTask) 






module.exports = router