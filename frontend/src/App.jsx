import Login from "./components/Login";
import Attendance from "./components/Attendance";
import Statistics from "./components/Statistics";
import ClassManagement from "./components/ClassManagement";
import StudentList from "./components/StudentList";
import MarkAttendance from "./components/MarkAttendance";
import HistoricalAttendance from "./HistoricalAttendance";

const App = () => {
  return (
    <div>
      <Login />
      <br />
      <br />
      <br />
      <Attendance />
      <br />
      <br />
      <br />
      <Statistics />
      <br />
      <br />
      <br />
      <ClassManagement />
      <br />
      <br />

      <StudentList />
      <MarkAttendance />

      <br />
      <HistoricalAttendance />
    </div>
  );
};
export default App;
