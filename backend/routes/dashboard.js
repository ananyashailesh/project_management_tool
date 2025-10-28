const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Employee = require('../models/employees');
const Project = require('../models/projects');
const Task = require('../models/tasks');
const Timesheet = require('../models/timesheets');

router.get('/dashboard', async (req, res) => {
    try {
        // Employee Statistics
        const totalEmployees = await Employee.countDocuments();
        const activeEmployees = await Employee.countDocuments({ status: 'Active' });
        const inActiveEmployees = await Employee.countDocuments({ status: 'In Active' });
        const terminatedEmployees = await Employee.countDocuments({ status: 'Terminated' });

        // Project Statistics
        const totalProjects = await Project.countDocuments();
        const completedProjects = await Project.countDocuments({ status: 'Completed' });
        const inProgressProjects = await Project.countDocuments({ status: 'In Progress' });
        const testingProjects = await Project.countDocuments({ status: 'Testing' });
        const pendingProjects = await Project.countDocuments({ status: 'On Hold' });

        // Task Statistics
        const totalTasks = await Task.countDocuments();
        const completedTasks = await Task.countDocuments({ status: 'Completed' });
        const inProgressTasks = await Task.countDocuments({ status: 'In Progress' });
        const pendingTasks = await Task.countDocuments({ status: 'Pending' });

        // Timesheet Statistics
        const totalTimesheets = await Timesheet.countDocuments();
        const developmentType = await Timesheet.countDocuments({ type: 'Development' });
        const testingType = await Timesheet.countDocuments({ type: 'Testing' });
        const otherType = await Timesheet.countDocuments({ type: 'Other' });

        // Calculate percentages for circular progress
        const employeeStats = {
            activePercentage: totalEmployees > 0 ? Math.round((activeEmployees / totalEmployees) * 100) : 0,
            inActivePercentage: totalEmployees > 0 ? Math.round((inActiveEmployees / totalEmployees) * 100) : 0,
            terminatedPercentage: totalEmployees > 0 ? Math.round((terminatedEmployees / totalEmployees) * 100) : 0
        };

        const projectStats = {
            completedPercentage: totalProjects > 0 ? Math.round((completedProjects / totalProjects) * 100) : 0,
            inProgressPercentage: totalProjects > 0 ? Math.round((inProgressProjects / totalProjects) * 100) : 0,
            testingPercentage: totalProjects > 0 ? Math.round((testingProjects / totalProjects) * 100) : 0,
            pendingPercentage: totalProjects > 0 ? Math.round((pendingProjects / totalProjects) * 100) : 0
        };

        const taskStats = {
            completedPercentage: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
            inProgressPercentage: totalTasks > 0 ? Math.round((inProgressTasks / totalTasks) * 100) : 0,
            pendingPercentage: totalTasks > 0 ? Math.round((pendingTasks / totalTasks) * 100) : 0
        };

        const timesheetStats = {
            developmentPercentage: totalTimesheets > 0 ? Math.round((developmentType / totalTimesheets) * 100) : 0,
            testingPercentage: totalTimesheets > 0 ? Math.round((testingType / totalTimesheets) * 100) : 0,
            otherPercentage: totalTimesheets > 0 ? Math.round((otherType / totalTimesheets) * 100) : 0
        };

        const dashboardData = {
            employees: {
                total: totalEmployees,
                active: activeEmployees,
                inActive: inActiveEmployees,
                terminated: terminatedEmployees,
                ...employeeStats
            },
            projects: {
                total: totalProjects,
                completed: completedProjects,
                inProgress: inProgressProjects,
                testing: testingProjects,
                pending: pendingProjects,
                ...projectStats
            },
            tasks: {
                total: totalTasks,
                completed: completedTasks,
                inProgress: inProgressTasks,
                pending: pendingTasks,
                ...taskStats
            },
            timesheets: {
                total: totalTimesheets,
                development: developmentType,
                testing: testingType,
                other: otherType,
                ...timesheetStats
            }
        };

        res.status(200).json(dashboardData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router