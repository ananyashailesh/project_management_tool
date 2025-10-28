const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Project = require('../models/projects');


router.post('/project', async (req, res) => {
    try {
        const {
            title,
            description,
            clientName,
            startDate,
            status,
            priority
        } = req.body;

        const newProject = new Project({
            title,
            description,
            clientName,
            startDate,
            status,
            priority
        });

        await newProject.save();
        res.status(201).json({ message: 'Project added successfully' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

router.get('/projects', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.send(projects)
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

router.get('/projects-stats', async (req, res) => {
    try {
        const totalProjects = await Project.countDocuments();
        const completedProjects = await Project.countDocuments({ status: 'Completed' });
        const inProgressProjects = await Project.countDocuments({ status: 'In Progress' });
        const testingProjects = await Project.countDocuments({ status: 'Testing' });
        const pendingProjects = await Project.countDocuments({ status: 'On Hold' });

        const projectsStats = {
            totalProjects,
            completedProjects,
            inProgressProjects,
            testingProjects,
            pendingProjects,
        };

        res.status(200).json(projectsStats);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

module.exports = router