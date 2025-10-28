import React, { useState, useEffect } from 'react'
import Sidenav from '../../components/sidenav/Sidenav'
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import "./projects.css"
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
import AddProjectModal from './modals/AddProject';
import ReadProjectModal from './modals/ReadProject';
import { IoMdAdd } from "react-icons/io";
import axios from 'axios';


function Projects() {
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [isReadProjectModalOpen, setIsReadProjectModalOpen] = useState(false);
  const [projectsData, setProjectsData] = useState([]);
  const [filteredProjectsData, setFilteredProjectsData] = useState([]);
  const [projectsStats, setProjectsStats] = useState({
    totalProjects: 0,
    completedProjects: 0,
    inProgressProjects: 0,
    testingProjects: 0,
    pendingProjects: 0,
  });
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const getProjects = async () => {
    try {
      const response = await axios.get('api/projects');
      setProjectsData(response.data);
      setFilteredProjectsData(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const getProjectsStats = async () => {
    try {
      const response = await axios.get('api/projects-stats');
      setProjectsStats(response.data);
    } catch (error) {
      console.error('Error fetching project stats:', error);
    }
  };

  useEffect(() => {
    getProjects();
    getProjectsStats();
  }, []);

  const openAddProjectModal = () => {
    setIsAddProjectModalOpen(true);
  };
  
  const openReadProjectModal = (project) => {
    setSelectedProject(project);
    setIsReadProjectModalOpen(true);
  };

  const closeAddProjectModal = () => {
    setIsAddProjectModalOpen(false);
    // Refresh data after closing modal
    getProjects();
    getProjectsStats();
  };
  
  const closeReadProjectModal = () => {
    setIsReadProjectModalOpen(false);
    setSelectedProject(null);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredProjectsData(projectsData);
      return;
    }

    const lowercaseQuery = query.toLowerCase();
    const filtered = projectsData.filter(project => 
      project.title?.toLowerCase().includes(lowercaseQuery) ||
      project.description?.toLowerCase().includes(lowercaseQuery) ||
      project.status?.toLowerCase().includes(lowercaseQuery) ||
      project.priority?.toLowerCase().includes(lowercaseQuery)
    );
    
    setFilteredProjectsData(filtered);
  };

  // Calculate percentages
  const totalProjects = projectsStats.totalProjects || 1;
  const completedPercentage = Math.round((projectsStats.completedProjects / totalProjects) * 100) || 0;
  const inProgressPercentage = Math.round((projectsStats.inProgressProjects / totalProjects) * 100) || 0;
  const testingPercentage = Math.round((projectsStats.testingProjects / totalProjects) * 100) || 0;
  const pendingPercentage = Math.round((projectsStats.pendingProjects / totalProjects) * 100) || 0;

  // Filter projects by status
  const pendingProjects = filteredProjectsData.filter(p => p.status === 'On Hold');
  const inProgressProjectsList = filteredProjectsData.filter(p => p.status === 'In Progress');
  const testingProjectsList = filteredProjectsData.filter(p => p.status === 'Testing');
  const completedProjectsList = filteredProjectsData.filter(p => p.status === 'Completed');

  return (
    <>
      <AddProjectModal isOpen={isAddProjectModalOpen} onClose={closeAddProjectModal} />
      <ReadProjectModal isOpen={isReadProjectModalOpen} onClose={closeReadProjectModal} project={selectedProject} />
      <div className='app-main-container'>
        <div className='app-main-left-container'><Sidenav /></div>
        <div className='app-main-right-container'>
          <Navbar onSearch={handleSearch} />
          <div className='dashboard-main-container'>
            <div className='dashboard-main-left-container'>
              <div className='task-status-card-container'>
                <div className='add-task-inner-div'>
                  <FcStatistics className='task-stats' />
                  <p className='todo-text'>Projects Statistics</p>
                </div>
                <div className='stat-first-row'>
                  <div className='stats-container container-bg1'>
                    <img className='stats-icon' src={totaltasks} alt="totaltasks" />
                    <div>
                      <p className='stats-num'>{projectsStats.totalProjects}</p>
                      <p className='stats-text'>Total Projects</p>
                    </div>
                  </div>
                  <div className='stats-container container-bg4'>
                    <img className='stats-icon' src={totalcomplete} alt="totalcomplete" />
                    <div>
                      <p className='stats-num'>{projectsStats.completedProjects}</p>
                      <p className='stats-text'>Completed</p>
                    </div>
                  </div>
                </div>
                <div className='stat-second-row'>
                  <div className='stats-container container-bg2'>
                    <img className='stats-icon' src={totalprogress} alt="totalprogress" />
                    <div>
                      <p className='stats-num'>{projectsStats.inProgressProjects}</p>
                      <p className='stats-text'>In Progress</p>
                    </div>
                  </div>
                  <div className='stats-container container-bg3'>
                    <img className='stats-icon' src={totalpending} alt="totalpending" />
                    <div>
                      <p className='stats-num'>{projectsStats.pendingProjects}</p>
                      <p className='stats-text'>Pending</p>
                    </div>
                  </div>
                </div>
              </div>
                            <div className='add-task-main-container'>
                <div className='add-task-main-div'>
                  <div className='add-task-inner-div'>
                    <img src={pending} alt="pending" />
                    <p className='todo-text'>To-Do Projects</p>
                  </div>
                  <button className='table-btn-task' onClick={openAddProjectModal}><IoMdAdd />Add Project</button>

                </div>
                {pendingProjects.length > 0 ? pendingProjects.map((project) => (
                  <div className='task-card-container' key={project._id}>
                    <p className='task-title'>{project.title}</p>
                    <div className='task-desc-container'>
                      <p className='task-desc'>{project.description}</p>
                    </div>
                    <div className='task-card-footer-container'>
                      <div>
                        <Tag size='lg' colorScheme={project.priority === 'Most Important' ? 'red' : project.priority === 'Important' ? 'yellow' : 'green'} borderRadius='full'>
                          <p className='tag-text'>{project.priority}</p>
                        </Tag>
                      </div>
                      <div>
                        <div className='task-read' onClick={() => openReadProjectModal(project)}>
                          <IoReaderOutline className='read-icon' />
                        </div>
                      </div>
                    </div>
                    <p className='created'>Created on: {new Date(project.startDate).toLocaleDateString()}</p>
                  </div>
                )) : (
                  <div className='task-card-container'>
                    <p className='task-desc'>No pending projects</p>
                  </div>
                )}
              </div>
            </div>

            <div className='dashboard-main-right-container'>
              <div className='task-status-card-container'>
                <div className='add-task-inner-div'>
                  <img src={complete} alt="complete" />
                  <p className='todo-text'>Projects Status</p>
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
                    <CircularProgress value={testingPercentage} color='orange' size={'100px'}>
                      <CircularProgressLabel>{testingPercentage}%</CircularProgressLabel>
                    </CircularProgress>
                    <p className='testing'>Testing</p>

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
                    <p className='todo-text'>In Progress Projects</p>
                  </div>
                </div>
                {inProgressProjectsList.length > 0 ? inProgressProjectsList.map((project) => (
                  <div className='task-card-container' key={project._id}>
                    <p className='task-title'>{project.title}</p>
                    <div className='task-desc-container'>
                      <p className='task-desc'>{project.description}</p>
                    </div>
                    <div className='task-card-footer-container'>
                      <div>
                        <Tag size='lg' colorScheme='blue' borderRadius='full'>
                          <p className='tag-text'>In Progress</p>
                        </Tag>
                      </div>
                      <div>
                        <div className='task-read' onClick={() => openReadProjectModal(project)}>
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
                    <p className='task-desc'>No in-progress projects</p>
                  </div>
                )}
              </div>
                            <div className='add-task-main-container'>
                <div className='add-task-main-div'>
                  <div className='add-task-inner-div'>
                    <img src={book} alt="Book" />
                    <p className='todo-text'>Testing Projects</p>
                  </div>
                </div>
                {testingProjectsList.length > 0 ? testingProjectsList.map((project) => (
                  <div className='task-card-container' key={project._id}>
                    <p className='task-title'>{project.title}</p>
                    <div className='task-desc-container'>
                      <p className='task-desc'>{project.description}</p>
                    </div>
                    <div className='task-card-footer-container'>
                      <div>
                        <Tag size='lg' colorScheme='orange' borderRadius='full'>
                          <p className='tag-text'>Testing</p>
                        </Tag>
                      </div>
                      <div>
                        <div className='task-read' onClick={() => openReadProjectModal(project)}>
                          <IoReaderOutline className='read-icon' />
                        </div>
                      </div>
                      <div>
                        <CircularProgress value={75} color='orange'>
                          <CircularProgressLabel>75%</CircularProgressLabel>
                        </CircularProgress>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className='task-card-container'>
                    <p className='task-desc'>No testing projects</p>
                  </div>
                )}
              </div>
              <div className='add-task-main-container'>
                <div className='add-task-main-div'>
                  <div className='add-task-inner-div'>
                    <img src={book} alt="Book" />
                    <p className='todo-text'>Completed Projects</p>
                  </div>
                </div>
                {completedProjectsList.length > 0 ? completedProjectsList.map((project) => (
                  <div className='task-card-container' key={project._id}>
                    <p className='task-title'>{project.title}</p>
                    <div className='task-desc-container'>
                      <p className='task-desc'>{project.description}</p>
                    </div>
                    <div className='task-card-footer-container'>
                      <div>
                        <Tag size='lg' colorScheme='green' borderRadius='full'>
                          <p className='tag-text'>Completed</p>
                        </Tag>
                      </div>
                      <div>
                        <div className='task-read' onClick={() => openReadProjectModal(project)}>
                          <IoReaderOutline className='read-icon' />
                        </div>
                      </div>
                    </div>
                    <p className='created'>Completed on: {new Date(project.startDate).toLocaleDateString()}</p>
                  </div>
                )) : (
                  <div className='task-card-container'>
                    <p className='task-desc'>No completed projects</p>
                  </div>
                )}
              </div>
              <div className='add-task-main-container'>
                <div className='add-task-main-div'>
                  <div className='add-task-inner-div'>
                    <img src={book} alt="Book" />
                    <p className='todo-text'>Completed Projects</p>
                  </div>
                </div>
                <div className='task-card-container'>
                  <p className='task-title'>Attend Nischal’s Birthday
                    Party</p>
                  <div className='task-desc-container'>
                    <p className='task-desc'>Buy gifts on  way and pick up cake frothem the bakery. (6 PM | Fresh Elements).....n  way and pick up cake frothem the bakery. (6 PM | n  way and pick up cake frothem the bakery. (6 PM | n  way and pick up cake frothem the bakery. (6 PM | n  way and pick up cake frothem the bakery. (6 PM | n  way and pick up cake frothem the bakery. (6 PM | n  way and pick up cake frothem the bakery. (6 PM | n  way and pick up cake frothem the bakery. (6 PM | n  way and pick up cake frothem the bakery. (6 PM | n  way and pick up cake frothem the bakery. (6 PM | </p>
                  </div>
                  <div className='task-card-footer-container'>
                    <div>
                      <Tag size='lg' colorScheme='green' borderRadius='full'>
                        <p className='tag-text'>Completed</p>
                      </Tag>
                    </div>
                    <div>
                      <div className='task-read'>
                        <IoReaderOutline className='read-icon' />
                      </div>
                    </div>
                  </div>
                  <p className='created'>Completed 2 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Projects