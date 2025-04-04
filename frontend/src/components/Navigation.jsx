//Show list of button, if clicked then it goes to the corresponding view or page

const Navigation = ({ setView }) => {
  return (
    <div>
      <button onClick={() => setView("login")}>Login</button>
      <button onClick={() => setView("current-student")}>
        Current Student
      </button>
      <button onClick={() => setView("mark-attendance")}>
        Mark Attendance
      </button>
      <button onClick={() => setView("hsitorical-attendance")}>
        Historical Attendance
      </button>
    </div>
  );
};
export default Navigation;
