import { useState } from "react";

const HistoricalAttendance = () => {
  // Sample data: Student attendance records
  const allStudents = [
    { id: 1, name: "Ana" },
    { id: 2, name: "Bob" },
  ];

  // Sample attendance data for each student
  const attendanceData = {
    1: [
      { date: "2025-03-01", status: "Present" },
      { date: "2025-03-02", status: "Absent" },
      { date: "2025-03-03", status: "Present" },
    ],
    2: [
      { date: "2025-03-01", status: "Absent" },
      { date: "2025-03-02", status: "Present" },
      { date: "2025-03-03", status: "Absent" },
    ],
  };

  const [selectedStudent, setSelectedStudent] = useState(allStudents[0]);
  const [startDate, setStartDate] = useState("2025-03-01");
  const [endDate, setEndDate] = useState("2025-03-03");

  // Filter attendance data based on the date range
  const getFilteredAttendance = (studentId, start, end) => {
    const studentAttendance = attendanceData[studentId] || [];
    return studentAttendance.filter(
      (record) => record.date >= start && record.date <= end
    );
  };

  const filteredAttendance = getFilteredAttendance(
    selectedStudent.id,
    startDate,
    endDate
  );

  return (
    <div>
      <h1>Student Attendance History</h1>

      {/* Dropdown to select a student */}
      <label htmlFor="student-select">Student: </label>
      <select
        id="student-select"
        value={selectedStudent.id}
        onChange={(e) =>
          setSelectedStudent(
            allStudents.find(
              (student) => student.id === parseInt(e.target.value)
            )
          )
        }
      >
        {allStudents.map((student) => (
          <option key={student.id} value={student.id}>
            {student.name}
          </option>
        ))}
      </select>

      <br />

      {/* Date range selection */}
      <label htmlFor="start-date">Start Date: </label>
      <input
        type="date"
        id="start-date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <br />
      <label htmlFor="end-date">End Date: </label>
      <input
        type="date"
        id="end-date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />

      {/* Attendance Table */}
      <h2>Attendance for {selectedStudent.name}</h2>
      <table className="t1" border="1">
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredAttendance.length === 0 ? (
            <tr>
              <td colSpan="2">No attendance records found</td>
            </tr>
          ) : (
            filteredAttendance.map((record) => (
              <tr key={record.date}>
                <td>{record.date}</td>
                <td>{record.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HistoricalAttendance;
