import React, { useState, useEffect } from 'react'
import Sidenav from '../../components/sidenav/Sidenav'
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import "./tasks.css"
import pending from '../../assets/tasks/Pending.png';
import complete from '../../assets/tasks/complete.png';
import book from '../../assets/tasks/Book.png';
import totaltasks from '../../assets/tasks/totaltasks.png';
import totalprogress from '../../assets/tasks/totalprogress.png';
import totalpending from '../../assets/tasks/totalpending.png';
import totalcomplete from '../../assets/tasks/totalcomplete.png';
import { IoReaderOutline } from "react-icons/io5";
import { FcStatistics } from "react-icons/fc";
import Navbar from '../../components/navbar/Navbar'
import {
    Tag,
} from '@chakra-ui/react'
import AddTaskModal from './modals/AddTask';
import ReadTaskModal from './modals/ReadTask';
import { IoMdAdd } from "react-icons/io";
import axios from 'axios';

function Tasks() {
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
    const [isReadTaskModalOpen, setIsReadTaskModalOpen] = useState(false);
    const [tasksData, setTasksData] = useState([]);
    const [filteredTasksData, setFilteredTasksData] = useState([]);
    const [tasksStats, setTasksStats] = useState({
        totalTasks: 0,
        completedTasks: 0,
        inProgressTasks: 0,
        pendingTasks: 0,
    });
    const [selectedTask, setSelectedTask] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const getTasks = async () => {
        try {
            const response = await axios.get('api/tasks');
            setTasksData(response.data);
            setFilteredTasksData(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const getTasksStats = async () => {
        try {
            const response = await axios.get('api/tasks-stats');
            setTasksStats(response.data);
        } catch (error) {
            console.error('Error fetching task stats:', error);
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        
        if (!query.trim()) {
            setFilteredTasksData(tasksData);
            return;
        }

        const lowercaseQuery = query.toLowerCase();
        const filtered = tasksData.filter(task => 
            task.title?.toLowerCase().includes(lowercaseQuery) ||
            task.description?.toLowerCase().includes(lowercaseQuery) ||
            task.status?.toLowerCase().includes(lowercaseQuery) ||
            task.priority?.toLowerCase().includes(lowercaseQuery) ||
            task.assignTo?.name?.toLowerCase().includes(lowercaseQuery) ||
            task.project?.title?.toLowerCase().includes(lowercaseQuery)
        );
        
        setFilteredTasksData(filtered);
    };

    useEffect(() => {
        getTasks();
        getTasksStats();
    }, []);
    
    const openAddTaskModal = () => {
        setIsAddTaskModalOpen(true);
    };
    
    const openReadTaskModal = (task) => {
        setSelectedTask(task);
        setIsReadTaskModalOpen(true);
    };

    const closeAddTaskModal = () => {
        setIsAddTaskModalOpen(false);
        getTasks();
        getTasksStats();
    };
    
    const closeReadTaskModal = () => {
        setIsReadTaskModalOpen(false);
        setSelectedTask(null);
    };

    const totalTasks = tasksStats.totalTasks || 1;
    const completedPercentage = Math.round((tasksStats.completedTasks / totalTasks) * 100) || 0;
    const inProgressPercentage = Math.round((tasksStats.inProgressTasks / totalTasks) * 100) || 0;
    const pendingPercentage = Math.round((tasksStats.pendingTasks / totalTasks) * 100) || 0;

    const pendingTasks = filteredTasksData.filter(t => t.status === 'Pending');
    const inProgressTasksList = filteredTasksData.filter(t => t.status === 'In Progress');
    const completedTasksList = filteredTasksData.filter(t => t.status === 'Completed');

    return (
        <>
            <AddTaskModal isOpen={isAddTaskModalOpen} onClose={closeAddTaskModal} />
            <ReadTaskModal isOpen={isReadTaskModalOpen} onClose={closeReadTaskModal} task={selectedTask} />
            <div className='app-main-container'>
                <div className='app-main-left-container'><Sidenav /></div>
                <div className='app-main-right-container'>
                    <Navbar onSearch={handleSearch} />
                    <div className='dashboard-main-container'>
                        <div className='dashboard-main-left-container'>
                            <div className='task-status-card-container'>
                                <div className='add-task-inner-div'>
                                    <FcStatistics className='task-stats' />
                                    <p className='todo-text'>Tasks Statistics</p>
                                </div>
                                <div className='stat-first-row'>
                                    <div className='stats-container container-bg1'>
                                        <img className='stats-icon' src={totaltasks} alt="totaltasks" />
                                        <div>
                                            <p className='stats-num'>{tasksStats.totalTasks}</p>
                                            <p className='stats-text'>Total Task</p>
                                        </div>
                                    </div>
                                    <div className='stats-container container-bg4'>
                                        <img className='stats-icon' src={totalcomplete} alt="totalcomplete" />
                                        <div>
                                            <p className='stats-num'>{tasksStats.completedTasks}</p>
                                            <p className='stats-text'>Completed</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='stat-second-row'>
                                    <div className='stats-container container-bg2'>
                                        <img className='stats-icon' src={totalprogress} alt="totalprogress" />
                                        <div>
                                            <p className='stats-num'>{tasksStats.inProgressTasks}</p>
                                            <p className='stats-text'>In Progress</p>
                                        </div>
                                    </div>
                                    <div className='stats-container container-bg3'>
                                        <img className='stats-icon' src={totalpending} alt="totalpending" />
                                        <div>
                                            <p className='stats-num'>{tasksStats.pendingTasks}</p>
                                            <p className='stats-text'>Pending</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='add-task-main-container'>
                                <div className='add-task-main-div'>
                                    <div className='add-task-inner-div'>
                                        <img src={pending} alt="pending" />
                                        <p className='todo-text'>To-Do Tasks</p>
                                    </div>
                                    <button className='table-btn-task' onClick={openAddTaskModal}><IoMdAdd />Add Task</button>
                                </div>
                                {pendingTasks.length > 0 ? pendingTasks.map((task) => (
                                    <div className='task-card-container' key={task._id}>
                                        <p className='task-title'>{task.title}</p>
                                        <div className='task-desc-container'>
                                            <p className='task-desc'>{task.description}</p>
                                        </div>
                                        <div className='task-card-footer-container'>
                                            <div>
                                                <Tag size='lg' colorScheme={task.priority === 'Most Important' ? 'red' : task.priority === 'Important' ? 'yellow' : 'green'} borderRadius='full'>
                                                    <p className='tag-text'>{task.priority}</p>
                                                </Tag>
                                            </div>
                                            <div>
                                                <div className='task-read' onClick={() => openReadTaskModal(task)}>
                                                    <IoReaderOutline className='read-icon' />
                                                </div>
                                            </div>
                                        </div>
                                        <p className='created'>Created on: {new Date(task.startDate).toLocaleDateString()}</p>
                                    </div>
                                )) : (
                                    <div className='task-card-container'>
                                        <p className='task-desc'>No pending tasks</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='dashboard-main-right-container'>
                            <div className='task-status-card-container'>
                                <div className='add-task-inner-div'>
                                    <img src={complete} alt="complete" />
                                    <p className='todo-text'>Tasks Status</p>
                                </div>
                                <div className='task-status-progress-main-container'>
                                    <div>
                                        <CircularProgress value={completedPercentage} color='#05A301' size={'100px'}>
                                            <CircularProgressLabel>{completedPercentage}%</CircularProgressLabel>
                                        </CircularProgress>
                                        <p className='completed'>Completed</p>
                                    </div>
                                    <div>
                                        <CircularProgress value={inProgressPercentage} color='#0225FF' size={'100px'}>
                                            <CircularProgressLabel>{inProgressPercentage}%</CircularProgressLabel>
                                        </CircularProgress>
                                        <p className='progress'>In Progress</p>
                                    </div>
                                    <div>
                                        <CircularProgress value={pendingPercentage} color='#F21E1E' size={'100px'}>
                                            <CircularProgressLabel>{pendingPercentage}%</CircularProgressLabel>
                                        </CircularProgress>
                                        <p className='pending'>Pending</p>
                                    </div>
                                </div>
                            </div>
                            <div className='add-task-main-container'>
                                <div className='add-task-main-div'>
                                    <div className='add-task-inner-div'>
                                        <img src={book} alt="Book" />
                                        <p className='todo-text'>In Progress Tasks</p>
                                    </div>
                                </div>
                                {inProgressTasksList.length > 0 ? inProgressTasksList.map((task) => (
                                    <div className='task-card-container' key={task._id}>
                                        <p className='task-title'>{task.title}</p>
                                        <div className='task-desc-container'>
                                            <p className='task-desc'>{task.description}</p>
                                        </div>
                                        <div className='task-card-footer-container'>
                                            <div>
                                                <Tag size='lg' colorScheme='blue' borderRadius='full'>
                                                    <p className='tag-text'>In Progress</p>
                                                </Tag>
                                            </div>
                                            <div>
                                                <div className='task-read' onClick={() => openReadTaskModal(task)}>
                                                    <IoReaderOutline className='read-icon' />
                                                </div>
                                            </div>
                                            <div>
                                                <CircularProgress value={50} color='#0225FF'>
                                                    <CircularProgressLabel>50%</CircularProgressLabel>
                                                </CircularProgress>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className='task-card-container'>
                                        <p className='task-desc'>No in-progress tasks</p>
                                    </div>
                                )}
                            </div>
                            <div className='add-task-main-container'>
                                <div className='add-task-main-div'>
                                    <div className='add-task-inner-div'>
                                        <img src={book} alt="Book" />
                                        <p className='todo-text'>Completed Tasks</p>
                                    </div>
                                </div>
                                {completedTasksList.length > 0 ? completedTasksList.map((task) => (
                                    <div className='task-card-container' key={task._id}>
                                        <p className='task-title'>{task.title}</p>
                                        <div className='task-desc-container'>
                                            <p className='task-desc'>{task.description}</p>
                                        </div>
                                        <div className='task-card-footer-container'>
                                            <div>
                                                <Tag size='lg' colorScheme='green' borderRadius='full'>
                                                    <p className='tag-text'>Completed</p>
                                                </Tag>
                                            </div>
                                            <div>
                                                <div className='task-read' onClick={() => openReadTaskModal(task)}>
                                                    <IoReaderOutline className='read-icon' />
                                                </div>
                                            </div>
                                        </div>
                                        <p className='created'>Completed on: {new Date(task.startDate).toLocaleDateString()}</p>
                                    </div>
                                )) : (
                                    <div className='task-card-container'>
                                        <p className='task-desc'>No completed tasks</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Tasks
