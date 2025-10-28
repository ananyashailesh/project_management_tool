import React, { useState, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidenav from '../../components/sidenav/Sidenav'
import "./attendance.css"
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
import AddAttendanceModal from './modals/AddAttendance';
import api from '../../config/axios';

function Attendance() {
  const [isAddAttendanceModalOpen, setIsAddAttendanceModalOpen] = useState(false);
  const [attendancesData, setAttendancesData] = useState([]);
  const [filteredAttendancesData, setFilteredAttendancesData] = useState([]);

  const getAttendances = async () => {
    try {
      const response = await api.get('/api/attendances');
      setAttendancesData(response.data);
      setFilteredAttendancesData(response.data);
    } catch (error) {
      console.error('Error fetching attendances:', error);
    }
  };

  useEffect(() => {
    getAttendances();
  }, []);

  const openAddAttendanceModal = () => {
    setIsAddAttendanceModalOpen(true);
  };

  const closeAddAttendanceModal = () => {
    setIsAddAttendanceModalOpen(false);
    // Refresh data after closing modal
    getAttendances();
  };

  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredAttendancesData(attendancesData);
      return;
    }

    const lowercaseQuery = query.toLowerCase();
    const filtered = attendancesData.filter(attendance => 
      attendance.employee?.firstName?.toLowerCase().includes(lowercaseQuery) ||
      attendance.employee?.lastName?.toLowerCase().includes(lowercaseQuery) ||
      attendance.employee?.email?.toLowerCase().includes(lowercaseQuery) ||
      calculateStatus(attendance.timeIn, attendance.timeOut).toLowerCase().includes(lowercaseQuery)
    );
    
    setFilteredAttendancesData(filtered);
  };

  const calculateStatus = (timeIn, timeOut) => {
    if (timeIn && timeOut) return 'Complete';
    if (timeIn) return 'Checked In';
    return 'Absent';
  };

  return (
    <>
      <AddAttendanceModal isOpen={isAddAttendanceModalOpen} onClose={closeAddAttendanceModal} />
      <div className='app-main-container'>
        <div className='app-main-left-container'><Sidenav /></div>
        <div className='app-main-right-container'>
          <Navbar onSearch={handleSearch} />
          {/* <div className='task-status-card-container'>
            <div className='add-task-inner-div'>
              <FcStatistics className='task-stats' />
              <p className='todo-text'>Attendance Statistics</p>
            </div>
            <div className='stat-first-row'>
              <div className='stats-container container-bg1'>
                <img className='stats-icon' src={totaltasks} alt="totaltasks" />
                <div>
                  <p className='stats-num'>1200</p>
                  <p className='stats-text'>Total Timesheets</p>
                </div>
              </div>
              <div className='stats-container container-bg4'>
                <img className='stats-icon' src={totalcomplete} alt="totalcomplete" />
                <div>
                  <p className='stats-num'>1200</p>
                  <p className='stats-text'>Development Type</p>
                </div>
              </div>
            </div>
            <div className='stat-second-row'>
              <div className='stats-container container-bg2'>
                <img className='stats-icon' src={totalpending} alt="totalpending" />
                <div>
                  <p className='stats-num'>1200</p>
                  <p className='stats-text'>Testing Type</p>
                </div>
              </div>
              <div className='stats-container container-bg3'>
                <img className='stats-icon' src={totalprogress} alt="totalprogress" />
                <div>
                  <p className='stats-num'>1200</p>
                  <p className='stats-text'>Other Type</p>
                </div>
              </div>
            </div>
          </div> */}
          <div className='table-main-header'>
            <p className='table-header-text'>Attendance</p>
            <button className='table-btn' onClick={openAddAttendanceModal}><IoMdAdd />Add Attendance</button>
          </div>
          <TableContainer className='table-main-container'>

            <Table variant='striped' colorScheme='teal'>
              <Thead>
                <Tr>
                  <Th>Day</Th>
                  <Th>Time In</Th>
                  <Th>Time Out</Th>
                  <Th>Mark Attendance</Th>
                  <Th>Working Hours</Th>
                  <Th>Status</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredAttendancesData && filteredAttendancesData.length > 0 ? filteredAttendancesData.map((attendance) => (
                  <Tr key={attendance._id}>
                    <Td>{attendance.day}</Td>
                    <Td>{attendance.timeIn || 'Not marked'}</Td>
                    <Td>{attendance.timeOut || 'Not marked'}</Td>
                    <Td>{attendance.employee ? `${attendance.employee.firstName} ${attendance.employee.lastName}` : 'N/A'}</Td>
                    <Td>{attendance.workingHours || 'N/A'}</Td>
                    <Td>{calculateStatus(attendance.timeIn, attendance.timeOut)}</Td>
                    <Td>
                      Button
                    </Td>
                  </Tr>
                )) : (
                  <Tr>
                    <Td colSpan={7} style={{textAlign: 'center'}}>No attendance records found</Td>
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

export default Attendance