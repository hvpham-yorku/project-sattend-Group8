import { useState } from "react";

const StudentList = () => {
  // Initial list of current students
  const [currentStudents, setCurrentStudents] = useState([
    { id: 1, name: "Ana" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
    { id: 4, name: "David" },
  ]);

  // Static list of all students
  const allStudents = [
    { id: 1, name: "Ana" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
    { id: 4, name: "David" },
    { id: 5, name: "Emma" },
  ];

  const [query, setQuery] = useState("");

  // Filter students (case-insensitive & not already in currentStudents)
  const filteredStudents = allStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(query.toLowerCase()) &&
      !currentStudents.some((s) => s.id === student.id)
  );

  // Function to add a student to the current list
  const addStudent = (student) => {
    setCurrentStudents([...currentStudents, student]);
    setQuery(""); // Clear search after adding
  };

  return (
    <div>
      <h1>Current Students</h1>
      <ul>
        {currentStudents.length === 0 ? (
          <p>No students added yet</p>
        ) : (
          currentStudents.map((student) => (
            <li key={student.id}>
              ID: {student.id} - {student.name}
            </li>
          ))
        )}
      </ul>

      <h2>Search and Add Students</h2>
      <input
        type="text"
        placeholder="Search by student name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Show filtered students only if there's a search */}
      {query && (
        <ul>
          {filteredStudents.length === 0 ? (
            <p>No students found</p>
          ) : (
            filteredStudents.map((student) => (
              <li key={student.id}>
                ID: {student.id} - {student.name}{" "}
                <button onClick={() => addStudent(student)}>Add Student</button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default StudentList;
