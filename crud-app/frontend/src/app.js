import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './main.css'; // Import your main.css file

const App = () => {
  const [newTimeRecord, setNewTimeRecord] = useState({
    recorded_at: '',
  });
  const [inputValue, setInputValue] = useState('');
  const [timeRecords, setTimeRecords] = useState([]);

  useEffect(() => {
    fetchTimeRecords();
  }, []);

  const fetchTimeRecords = () => {
    axios.get('http://127.0.0.1:8000/api/time-records/')
      .then(response => {
        setTimeRecords(response.data);
      })
      .catch(error => {
        console.error('Error fetching time records:', error);
      });
  };

  const handleInputChange = (e) => {
    const localDateTime = e.target.value;
    setInputValue(localDateTime);

    if (localDateTime) {
      const utcDateTime = new Date(localDateTime).toISOString();
      setNewTimeRecord({ recorded_at: utcDateTime });
    } else {
      setNewTimeRecord({ recorded_at: '' });
    }
  };

  const handleAddTimeRecord = () => {
    axios.post('http://127.0.0.1:8000/api/time-records/', newTimeRecord)
      .then(response => {
        console.log('Time record added successfully:', response.data);
        fetchTimeRecords(); // Refresh records after adding new record
        setInputValue(''); // Clear input field after submission
        setNewTimeRecord({ recorded_at: '' }); // Clear newTimeRecord state
      })
      .catch(error => {
        console.error('Error adding time record:', error);
      });
  };

  const handleDeleteTimeRecord = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/time-records/${id}/`)
      .then(response => {
        console.log('Time record deleted successfully:', response.data);
        fetchTimeRecords(); // Refresh records after deletion
      })
      .catch(error => {
        console.error('Error deleting time record:', error);
      });
  };

  const formatToLocalTime = (utcDateTime) => {
    const date = new Date(utcDateTime);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
    const hours = date.getHours() % 12 || 12;
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    return `${day}/${month}/${year}, ${hours}:${minutes} ${ampm}`; // Swap month and day format
  };

  return (
    <div className='app-container'>
      <h1>Daily Time Record System</h1>

      {/* Datetime Input */}
      <div className='form-container'>
        <input
          type='datetime-local'
          className='form-inputs'
          value={inputValue}
          onChange={handleInputChange}
        />
        <button className='form-buttons' onClick={handleAddTimeRecord}>Add Time Record</button>
      </div>

      {/* Display Time Records */}
      <ul className='record-list'>
        {timeRecords.map(record => (
          <li key={record.id} className='record-item'>
            <div className='record-date'>{formatToLocalTime(record.recorded_at)}</div>
            <div className='actions'>
              <button className='delete' onClick={() => handleDeleteTimeRecord(record.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
