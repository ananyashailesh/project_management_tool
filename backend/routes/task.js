const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Task = require('../models/tasks');


router.post('/task', async (req, res) => {
    try {
        const {
            title,
            description,
            assignTo,
            project,
            startDate,
            priority
        } = req.body;

        const newTask = new Task({
            title,
            description,
            assignTo,
            project,
            startDate,
            priority
        });

        await newTask.save();
        res.status(201).json({ message: 'Task added successfully' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find()
            .populate('assignTo', 'firstName lastName')
            .populate('project', 'title')
            .sort({ createdAt: -1 });
        res.send(tasks)
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

router.get('/tasks-stats', async (req, res) => {
    try {
        const totalTasks = await Task.countDocuments();
        const completedTasks = await Task.countDocuments({ status: 'Completed' });
        const inProgressTasks = await Task.countDocuments({ status: 'In Progress' });
        const pendingTasks = await Task.countDocuments({ status: 'Pending' });

        const tasksStats = {
            totalTasks,
            completedTasks,
            inProgressTasks,
            pendingTasks,
        };

        res.status(200).json(tasksStats);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

module.exports = router