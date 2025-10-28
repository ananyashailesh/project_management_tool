import React, { useState, useEffect } from 'react'
import Sidenav from '../../components/sidenav/Sidenav'
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import "./dashboard.css"
import welcome from '../../assets/dashboard/welcome.png';
import complete from '../../assets/tasks/complete.png';
import totaltasks from '../../assets/tasks/totaltasks.png';
import totalprogress from '../../assets/tasks/totalprogress.png';
import totalpending from '../../assets/tasks/totalpending.png';
import totalcomplete from '../../assets/tasks/totalcomplete.png';
import { FcStatistics } from "react-icons/fc";
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    employees: { total: 0, active: 0, inActive: 0, terminated: 0, activePercentage: 0, inActivePercentage: 0, terminatedPercentage: 0 },
    projects: { total: 0, completed: 0, inProgress: 0, testing: 0, pending: 0, completedPercentage: 0, inProgressPercentage: 0, testingPercentage: 0, pendingPercentage: 0 },
    tasks: { total: 0, completed: 0, inProgress: 0, pending: 0, completedPercentage: 0, inProgressPercentage: 0, pendingPercentage: 0 },
    timesheets: { total: 0, development: 0, testing: 0, other: 0, developmentPercentage: 0, testingPercentage: 0, otherPercentage: 0 }
  });

  const getDashboard = async () => {
    try {
      const response = await axios.get('api/dashboard');
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  }
  
  useEffect(() => {
    getDashboard()
  }, [])
  

  return (
    <>
      <div className='app-main-container'>
        <div className='app-main-left-container'><Sidenav /></div>
        <div className='app-main-right-container'>
          <Navbar onSearch={() => {}} />
          <div className='welcome-main-container'>
            <div className='welcome-left-container'>
              <p className='mng-text'>Welcome To</p>
              <p className='mng-text'>Task Management Area</p>
              <p className='mng-para'>In this task management hub, the system seamlessly orchestrates task creation, assignment, and tracking, ensuring projects move forward smoothly and collaboratively.</p>
            </div>
            <div className='welcome-right-container'>
              <img className='welcome-img' src={welcome} alt="welcome" />
            </div>
          </div>
          <div className='dashboard-main-container'>
            <div className='dashboard-main-left-container'>
              <div className='task-status-card-container'>
                <div className='add-task-inner-div'>
                  <FcStatistics className='task-stats' />
                  <p className='todo-text'>Employees Statistics</p>
                </div>
                <div className='stat-first-row'>
                  <div className='stats-container container-bg1'>
                    <img className='stats-icon' src={totaltasks} alt="totaltasks" />
                    <div>
                      <p className='stats-num'>{dashboardData.employees.total}</p>
                      <p className='stats-text'>Total Employees</p>
                    </div>
                  </div>
                  <div className='stats-container container-bg4'>
                    <img className='stats-icon' src={totalcomplete} alt="totalcomplete" />
                    <div>
                      <p className='stats-num'>{dashboardData.employees.active}</p>
                      <p className='stats-text'>Active Employees</p>
                    </div>
                  </div>
                </div>
                <div className='stat-second-row'>
                  <div className='stats-container container-bg2'>
                    <img className='stats-icon' src={totalpending} alt="totalpending" />
                    <div>
                      <p className='stats-num'>{dashboardData.employees.inActive}</p>
                      <p className='stats-text'>In Active Employees</p>
                    </div>
                  </div>
                  <div className='stats-container container-bg3'>
                    <img className='stats-icon' src={totalprogress} alt="totalprogress" />
                    <div>
                      <p className='stats-num'>{dashboardData.employees.terminated}</p>
                      <p className='stats-text'>Terminated Employees</p>
                    </div>
                  </div>

                </div>
              </div>
              <div className='task-status-card-container'>
                <div className='add-task-inner-div'>
                  <FcStatistics className='task-stats' />
                  <p className='todo-text'>Projects Statistics</p>
                </div>
                <div className='stat-first-row'>
                  <div className='stats-container container-bg1'>
                    <img className='stats-icon' src={totaltasks} alt="totaltasks" />
                    <div>
                      <p className='stats-num'>{dashboardData.projects.total}</p>
                      <p className='stats-text'>Total Projects</p>
                    </div>
                  </div>
                  <div className='stats-container container-bg4'>
                    <img className='stats-icon' src={totalcomplete} alt="totalcomplete" />
                    <div>
                      <p className='stats-num'>{dashboardData.projects.completed}</p>
                      <p className='stats-text'>Completed</p>
                    </div>
                  </div>
                </div>
                <div className='stat-second-row'>
                  <div className='stats-container container-bg2'>
                    <img className='stats-icon' src={totalprogress} alt="totalprogress" />
                    <div>
                      <p className='stats-num'>{dashboardData.projects.inProgress}</p>
                      <p className='stats-text'>In Progress</p>
                    </div>
                  </div>
                  <div className='stats-container container-bg3'>
                    <img className='stats-icon' src={totalpending} alt="totalpending" />
                    <div>
                      <p className='stats-num'>{dashboardData.projects.pending}</p>
                      <p className='stats-text'>Pending</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='task-status-card-container'>
                <div className='add-task-inner-div'>
                  <FcStatistics className='task-stats' />
                  <p className='todo-text'>Tasks Statistics</p>
                </div>
                <div className='stat-first-row'>
                  <div className='stats-container container-bg1'>
                    <img className='stats-icon' src={totaltasks} alt="totaltasks" />
                    <div>
                      <p className='stats-num'>{dashboardData.tasks.total}</p>
                      <p className='stats-text'>Total Tasks</p>
                    </div>
                  </div>
                  <div className='stats-container container-bg4'>
                    <img className='stats-icon' src={totalcomplete} alt="totalcomplete" />
                    <div>
                      <p className='stats-num'>{dashboardData.tasks.completed}</p>
                      <p className='stats-text'>Completed</p>
                    </div>
                  </div>
                </div>
                <div className='stat-second-row'>
                  <div className='stats-container container-bg2'>
                    <img className='stats-icon' src={totalprogress} alt="totalprogress" />
                    <div>
                      <p className='stats-num'>{dashboardData.tasks.inProgress}</p>
                      <p className='stats-text'>In Progress</p>
                    </div>
                  </div>
                  <div className='stats-container container-bg3'>
                    <img className='stats-icon' src={totalpending} alt="totalpending" />
                    <div>
                      <p className='stats-num'>{dashboardData.tasks.pending}</p>
                      <p className='stats-text'>Pending</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='task-status-card-container'>
                <div className='add-task-inner-div'>
                  <FcStatistics className='task-stats' />
                  <p className='todo-text'>Timesheets Statistics</p>
                </div>
                <div className='stat-first-row'>
                  <div className='stats-container container-bg1'>
                    <img className='stats-icon' src={totaltasks} alt="totaltasks" />
                    <div>
                      <p className='stats-num'>{dashboardData.timesheets.total}</p>
                      <p className='stats-text'>Total Timesheets</p>
                    </div>
                  </div>
                  <div className='stats-container container-bg4'>
                    <img className='stats-icon' src={totalcomplete} alt="totalcomplete" />
                    <div>
                      <p className='stats-num'>{dashboardData.timesheets.development}</p>
                      <p className='stats-text'>Development Type</p>
                    </div>
                  </div>
                </div>
                <div className='stat-second-row'>
                  <div className='stats-container container-bg2'>
                    <img className='stats-icon' src={totalpending} alt="totalpending" />
                    <div>
                      <p className='stats-num'>{dashboardData.timesheets.testing}</p>
                      <p className='stats-text'>Testing Type</p>
                    </div>
                  </div>
                  <div className='stats-container container-bg3'>
                    <img className='stats-icon' src={totalprogress} alt="totalprogress" />
                    <div>
                      <p className='stats-num'>{dashboardData.timesheets.other}</p>
                      <p className='stats-text'>Other Type</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='dashboard-main-right-container'>
              <div className='task-status-card-container'>
                <div className='add-task-inner-div'>
                  <img src={complete} alt="complete" />
                  <p className='todo-text'>Employees Status</p>
                </div>
                <div className='task-status-progress-main-container'>
                  <div>
                    <CircularProgress value={dashboardData.employees.activePercentage} color='#05A301' size={'100px'}>
                      <CircularProgressLabel>{dashboardData.employees.activePercentage}%</CircularProgressLabel>
                    </CircularProgress>
                    <p className='completed'>Active</p>
                  </div>
                  <div>
                    <CircularProgress value={dashboardData.employees.inActivePercentage} color='#0225FF' size={'100px'}>
                      <CircularProgressLabel>{dashboardData.employees.inActivePercentage}%</CircularProgressLabel>
                    </CircularProgress>
                    <p className='progress'>In Active</p>
                  </div>
                  <div>
                    <CircularProgress value={dashboardData.employees.terminatedPercentage} color='#F21E1E' size={'100px'}>
                      <CircularProgressLabel>{dashboardData.employees.terminatedPercentage}%</CircularProgressLabel>
                    </CircularProgress>
                    <p className='pending'>Termintaed</p>
                  </div>
                </div>
              </div>
              <div className='task-status-card-container'>
                <div className='add-task-inner-div'>
                  <img src={complete} alt="complete" />
                  <p className='todo-text'>Projects Status</p>
                </div>
                <div className='task-status-progress-main-container'>
                  <div>
                    <CircularProgress value={dashboardData.projects.completedPercentage} color='#05A301' size={'100px'}>
                      <CircularProgressLabel>{dashboardData.projects.completedPercentage}%</CircularProgressLabel>
                    </CircularProgress>
                    <p className='completed'>Completed</p>
                  </div>
                  <div>
                    <CircularProgress value={dashboardData.projects.inProgressPercentage} color='#0225FF' size={'100px'}>
                      <CircularProgressLabel>{dashboardData.projects.inProgressPercentage}%</CircularProgressLabel>
                    </CircularProgress>
                    <p className='progress'>In Progress</p>

                  </div>
                  <div>
                    <CircularProgress value={dashboardData.projects.testingPercentage} color='orange' size={'100px'}>
                      <CircularProgressLabel>{dashboardData.projects.testingPercentage}%</CircularProgressLabel>
                    </CircularProgress>
                    <p className='testing'>Testing</p>

                  </div>
                  <div>
                    <CircularProgress value={dashboardData.projects.pendingPercentage} color='#F21E1E' size={'100px'}>
                      <CircularProgressLabel>{dashboardData.projects.pendingPercentage}%</CircularProgressLabel>
                    </CircularProgress>
                    <p className='pending'>Pending</p>
                  </div>
                </div>
              </div>
              <div className='task-status-card-container'>
                <div className='add-task-inner-div'>
                  <img src={complete} alt="complete" />
                  <p className='todo-text'>Tasks Status</p>
                </div>
                <div className='task-status-progress-main-container'>
                  <div>
                    <CircularProgress value={dashboardData.tasks.completedPercentage} color='#05A301' size={'100px'}>
                      <CircularProgressLabel>{dashboardData.tasks.completedPercentage}%</CircularProgressLabel>
                    </CircularProgress>
                    <p className='completed'>Completed</p>
                  </div>
                  <div>
                    <CircularProgress value={dashboardData.tasks.inProgressPercentage} color='#0225FF' size={'100px'}>
                      <CircularProgressLabel>{dashboardData.tasks.inProgressPercentage}%</CircularProgressLabel>
                    </CircularProgress>
                    <p className='progress'>In Progress</p>
                  </div>
                  <div>
                    <CircularProgress value={dashboardData.tasks.pendingPercentage} color='#F21E1E' size={'100px'}>
                      <CircularProgressLabel>{dashboardData.tasks.pendingPercentage}%</CircularProgressLabel>
                    </CircularProgress>
                    <p className='pending'>Pending</p>
                  </div>
                </div>
              </div>
              <div className='task-status-card-container'>
                <div className='add-task-inner-div'>
                  <img src={complete} alt="complete" />
                  <p className='todo-text'>Timesheets Status</p>
                </div>
                <div className='task-status-progress-main-container'>
                  <div>
                    <CircularProgress value={dashboardData.timesheets.developmentPercentage} color='#05A301' size={'100px'}>
                      <CircularProgressLabel>{dashboardData.timesheets.developmentPercentage}%</CircularProgressLabel>
                    </CircularProgress>
                    <p className='completed'>Development</p>
                  </div>
                  <div>
                    <CircularProgress value={dashboardData.timesheets.testingPercentage} color='orange' size={'100px'}>
                      <CircularProgressLabel>{dashboardData.timesheets.testingPercentage}%</CircularProgressLabel>
                    </CircularProgress>
                    <p className='testing'>Testing</p>

                  </div>
                  <div>
                    <CircularProgress value={dashboardData.timesheets.otherPercentage} color='#F21E1E' size={'100px'}>
                      <CircularProgressLabel>{dashboardData.timesheets.otherPercentage}%</CircularProgressLabel>
                    </CircularProgress>
                    <p className='pending'>Other</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default Dashboard