import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/student/")  // Django API URL
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, []);

  return (
    <div className="App">
      <h1>Student List</h1>
      <ul>
        {students.map((s) => (
          <li key={s.id}>
            {s.stuname} - {s.email}
          </li>
        ))}
      </ul>
    </div>
  );
}



export default App;
