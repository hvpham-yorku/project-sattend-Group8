import logo from './logo.svg';
import './App.css';

function App() {
    return (
        /*TODO: edit table values to variables that fill in based on DB with student list*/
        <div className="App">
            <h1>Mark Attendance</h1>
            <table>
                <thead>
                <tr>
                    <th>Student Name</th>
                    <th>Student ID</th>
                    <th>Attendance status</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Student A</td>
                    <td>Student A ID</td>
                    <td>
                        <button>Present</button>
                        <button>Absent</button>
                    </td>
                </tr>
                <tr>
                    <td>Student B</td>
                    <td>Student B ID</td>
                    <td>
                        <button>Present</button>
                        <button>Absent</button>
                    </td>
                </tr>
                <tr>
                    <td>Student C</td>
                    <td>Student C ID</td>
                    <td>
                        <button>Present</button>
                        <button>Absent</button>
                    </td>
                </tr>
                </tbody>
            </table>
            <button>Submit</button>
        </div>
        /* Starter code
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
      */
    );
}

export default App;
