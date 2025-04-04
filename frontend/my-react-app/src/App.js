import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {

    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      fetchClasses(JSON.parse(storedUser).id);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    fetchClasses(userData.id);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    setUser(null);
    setClasses([]);
    setSelectedClass(null);
    setStudents([]);
    setAttendanceData({});
  };

  const fetchClasses = async (userId) => {
 
    setClasses([
      { id: 'EECS3311_A_W25', name: 'Software Design' },
      { id: 'EECS4413_B_W25', name: 'Building E-Commerce Systems' }
    ]);
  };

  const fetchStudents = async (classId) => {

    setStudents([
      { id: '12345', name: 'Student A' },
      { id: '67890', name: 'Student B' },
      { id: '13579', name: 'Student C' }
    ]);

    setAttendanceData({});
  };

  const handleClassSelect = (classId) => {
    setSelectedClass(classId);
    fetchStudents(classId);
  };

  const handleAttendanceChange = (studentId, status) => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleSubmitAttendance = async () => {
   
    console.log('Submitting attendance:', { class: selectedClass, attendance: attendanceData });
    alert('Attendance submitted successfully!');
   
    setAttendanceData({});
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    if (showRegister) {
      return <Register onSwitchToLogin={() => setShowRegister(false)} />;
    } else {
      return <Login onLogin={handleLogin} onSwitchToRegister={() => setShowRegister(true)} />;
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>SAttend - Attendance System</h1>
        <div className="user-info">
          <span>Welcome, {user.firstName} {user.lastName} ({user.role})</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main>
        {classes.length > 0 && (
          <div className="class-selector">
            <h2>Select a class:</h2>
            <div className="class-buttons">
              {classes.map(cls => (
                <button 
                  key={cls.id} 
                  onClick={() => handleClassSelect(cls.id)}
                  className={selectedClass === cls.id ? 'selected' : ''}
                >
                  {cls.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedClass && (
          <div className="attendance-section">
            <h2>Mark Attendance for {classes.find(c => c.id === selectedClass)?.name}</h2>
            <table>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Student ID</th>
                  <th>Attendance status</th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.id}</td>
                    <td>
                      <button 
                        className={attendanceData[student.id] === 'PRESENT' ? 'selected' : ''}
                        onClick={() => handleAttendanceChange(student.id, 'PRESENT')}
                      >
                        Present
                      </button>
                      <button 
                        className={attendanceData[student.id] === 'ABSENT' ? 'selected' : ''}
                        onClick={() => handleAttendanceChange(student.id, 'ABSENT')}
                      >
                        Absent
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button 
              className="submit-button"
              onClick={handleSubmitAttendance}
              disabled={Object.keys(attendanceData).length === 0}
            >
              Submit
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;