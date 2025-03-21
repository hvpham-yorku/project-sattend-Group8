import Login from "./components/Login";
import Attendance from "./components/Attendance";
import Statistics from "./components/Statistics";
import ClassManagement from "./components/ClassManagement";
import StudentList from "./components/StudentList";
import MarkAttendance from "./components/MarkAttendance";
import HistoricalAttendance from "./components/HistoricalAttendance";
import "./index.css";
import { useState } from "react";
import Navigation from "./components/Navigation";

const App = () => {
  const [view, setView] = useState("");

  return (
    <div className="full-container">
      <Navigation setView={setView} />

      {view === "login" && <Login />}
      {view === "current-student" && <StudentList />}
      {view === "mark-attendance" && <MarkAttendance />}
      {view === "hsitorical-attendance" && <HistoricalAttendance />}
    </div>
  );
};
export default App;
