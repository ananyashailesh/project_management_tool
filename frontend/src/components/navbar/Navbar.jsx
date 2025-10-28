import * as React from 'react';
import { useState, useEffect } from 'react';
import "./navbar.css";
import { IoIosNotifications } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";

function Navbar({ onSearch }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentDate, setCurrentDate] = useState({
        day: '',
        date: ''
    });

    useEffect(() => {
        // Function to update date
        const updateDate = () => {
            const now = new Date();
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const dayName = days[now.getDay()];
            
            // Format date as DD/MM/YYYY
            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const year = now.getFullYear();
            const formattedDate = `${day}/${month}/${year}`;
            
            setCurrentDate({
                day: dayName,
                date: formattedDate
            });
        };

        // Update date immediately
        updateDate();
        
        // Update date every minute to keep it current
        const interval = setInterval(updateDate, 60000);
        
        return () => clearInterval(interval);
    }, []);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        
        // Call the onSearch callback if provided
        if (onSearch) {
            onSearch(query);
        }
    };

    const handleSearchClick = () => {
        if (onSearch) {
            onSearch(searchQuery);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearchClick();
        }
    };

    return (
        <div className='nav-main-container'>
            <div><p className='nav-main-text'>Dash<span>Board</span></p></div>
            <div className='nav-search-container'>
                <input 
                    placeholder='Search your task here...' 
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyPress={handleKeyPress}
                />
                <div className='task-read' onClick={handleSearchClick} style={{ cursor: 'pointer' }}>
                    <IoIosSearch className='read-icon' />
                </div>
            </div>
            <div className='nav-notification-container'>
                <div className='task-read'>
                    <IoIosNotifications className='read-icon' />
                </div>
                <div>
                    <p className='nav-day-text'>{currentDate.day}</p>
                    <p className='nav-date-text'>{currentDate.date}</p>
                </div>
            </div>
        </div>
    )
}
export default Navbar