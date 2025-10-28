import React, { useState, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidenav from '../../components/sidenav/Sidenav'
import "./timesheets.css"
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import { IoMdAdd } from "react-icons/io";

import totaltasks from '../../assets/tasks/totaltasks.png';
import totalprogress from '../../assets/tasks/totalprogress.png';
import totalpending from '../../assets/tasks/totalpending.png';
import totalcomplete from '../../assets/tasks/totalcomplete.png';
import { FcStatistics } from "react-icons/fc";
import AddTimesheetModal from './modals/AddTimesheet';
import axios from 'axios';

function Timesheets() {
  const [isAddTimesheetModalOpen, setIsAddTimesheetModalOpen] = useState(false);
  const [timesheetsData, setTimesheetsData] = useState([]);
  const [filteredTimesheetsData, setFilteredTimesheetsData] = useState([]);
  const [timesheetsStats, setTimesheetsStats] = useState({
    totalTimesheets: 0,
    developmentType: 0,
    testType: 0,
    otherType: 0,
  });
  const [searchQuery, setSearchQuery] = useState('');

  const openAddTimesheetModal = () => {
    setIsAddTimesheetModalOpen(true);
  };

  const closeAddTimesheetModal = () => {
    setIsAddTimesheetModalOpen(false);
    // Refresh data after closing modal
    getTimesheets();
    getTimesheetsStats();
  };

  const getTimesheets = async () => {
    try {
      const response = await axios.get('api/timesheets')
      setTimesheetsData(response.data)
      setFilteredTimesheetsData(response.data)
    } catch (error) {
      console.error('Error:', error);
    }
  }
  const getTimesheetsStats = async () => {
    try {
      const response = await axios.get('api/timesheets-stats')
      setTimesheetsStats(response.data)
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleSearch = (query) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredTimesheetsData(timesheetsData);
      return;
    }

    const lowercaseQuery = query.toLowerCase();
    const filtered = timesheetsData.filter(timesheet => 
      timesheet.employee?.name?.toLowerCase().includes(lowercaseQuery) ||
      timesheet.project?.title?.toLowerCase().includes(lowercaseQuery) ||
      timesheet.task?.title?.toLowerCase().includes(lowercaseQuery) ||
      timesheet.type?.toLowerCase().includes(lowercaseQuery) ||
      timesheet.description?.toLowerCase().includes(lowercaseQuery)
    );
    
    setFilteredTimesheetsData(filtered);
  };

  useEffect(() => {
    getTimesheets()
    getTimesheetsStats()
  }, [])
  return (
    <>
      <AddTimesheetModal isOpen={isAddTimesheetModalOpen} onClose={closeAddTimesheetModal} />
      <div className='app-main-container'>
        <div className='app-main-left-container'><Sidenav /></div>
        <div className='app-main-right-container'>
          <Navbar onSearch={handleSearch} />
          <div className='task-status-card-container'>
            <div className='add-task-inner-div'>
              <FcStatistics className='task-stats' />
              <p className='todo-text'>Timesheets Statistics</p>
            </div>
            <div className='stat-first-row'>
              <div className='stats-container container-bg1'>
                <img className='stats-icon' src={totaltasks} alt="totaltasks" />
                <div>
                  <p className='stats-num'>{timesheetsStats.totalTimesheets}</p>
                  <p className='stats-text'>Total Timesheets</p>
                </div>
              </div>
              <div className='stats-container container-bg4'>
                <img className='stats-icon' src={totalcomplete} alt="totalcomplete" />
                <div>
                  <p className='stats-num'>{timesheetsStats.developmentType}</p>
                  <p className='stats-text'>Development Type</p>
                </div>
              </div>
            </div>
            <div className='stat-second-row'>
              <div className='stats-container container-bg2'>
                <img className='stats-icon' src={totalpending} alt="totalpending" />
                <div>
                  <p className='stats-num'>{timesheetsStats.testType}</p>
                  <p className='stats-text'>Testing Type</p>
                </div>
              </div>
              <div className='stats-container container-bg3'>
                <img className='stats-icon' src={totalprogress} alt="totalprogress" />
                <div>
                  <p className='stats-num'>{timesheetsStats.otherType}</p>
                  <p className='stats-text'>Other Type</p>
                </div>
              </div>
            </div>
          </div>
          <div className='table-main-header'>
            <p className='table-header-text'>Timesheets</p>
            <button className='table-btn' onClick={openAddTimesheetModal}><IoMdAdd />Add Timesheet</button>
          </div>
          <TableContainer className='table-main-container'>

            <Table variant='striped' colorScheme='teal'>
              <Thead>
                <Tr>
                  <Th>Notes</Th>
                  <Th>Employee</Th>
                  <Th>Project</Th>
                  <Th>Task</Th>
                  <Th>Progress</Th>
                  <Th>Time Spent</Th>
                  <Th>Created Date</Th>
                  <Th>Type</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredTimesheetsData && filteredTimesheetsData.length > 0 ? filteredTimesheetsData.map((timesheet) => (
                  <Tr key={timesheet._id}>
                    <Td>{timesheet.notes}</Td>
                    <Td>{timesheet.employee ? `${timesheet.employee.firstName} ${timesheet.employee.lastName}` : 'N/A'}</Td>
                    <Td>{timesheet.project ? timesheet.project.title : 'N/A'}</Td>
                    <Td>{timesheet.task ? timesheet.task.title : 'N/A'}</Td>
                    <Td>{timesheet.progress}%</Td>
                    <Td>{timesheet.timeSpent} hrs</Td>
                    <Td>{timesheet.date ? new Date(timesheet.date).toLocaleDateString() : 'N/A'}</Td>
                    <Td>{timesheet.type}</Td>
                    <Td>
                      Button
                    </Td>
                  </Tr>
                )) : (
                  <Tr>
                    <Td colSpan={9} style={{textAlign: 'center'}}>No timesheets found</Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </div>


    </>
  )
}

export default Timesheets