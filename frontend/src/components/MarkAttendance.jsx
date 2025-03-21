import { useState } from "react";

const MarkAttendance = () => {
  const today = new Date();
  const allStudents = [
    { id: 1, name: "Ana sfds " },
    { id: 2, name: "Bobf  dds" },
    { id: 3, name: "Csfsf  fsdfs" },
    { id: 4, name: "Dsfdsfs fsdfs" },
  ];

  // Store attendance per student
  const [attendance, setAttendance] = useState({});

  const handleAttendanceChange = (studentId, isPresent) => {
    setAttendance({
      ...attendance,
      [studentId]: isPresent, // Set true for present, false for absent
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setAttendance({});
  };

  return (
    <div>
      <h1>Mark Attendance</h1>
      <p>Date: {today.toLocaleDateString()}</p>
      <p>Class:{}</p>
      <form onSubmit={handleSubmit}>
        <ul>
          {allStudents.map((student) => (
            <li key={student.id}>
              ID: {student.id} - {student.name}
              <div>
                <label> Present </label>
                <input
                  type="radio"
                  // group presence by student id => presence-1
                  name={`presence-${student.id}`}
                  value="true"
                  checked={attendance[student.id] === true}
                  onChange={() => handleAttendanceChange(student.id, true)}
                />
                <label> Absent </label>
                <input
                  type="radio"
                  name={`presence-${student.id}`}
                  value="false"
                  checked={attendance[student.id] === false}
                  onChange={() => handleAttendanceChange(student.id, false)}
                />
              </div>
            </li>
          ))}
        </ul>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MarkAttendance;
