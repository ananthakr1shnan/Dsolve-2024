import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectCreationForm from './ProjectCreationForm';
import TaskManagement from './TaskManagement';

function App() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const apiUrl = 'https://api.sheety.co/337898d042c47933efc052bf69d5e136/project/sheet2';

    axios.get(apiUrl)
      .then(response => {
        setData(response.data.sheet2);
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.message);
      });
  }, []);

  useEffect(() => {
    if (data) {
      setProjects(data);
    }
  }, [data]);

  return (
    <div>
      <h1>Project Management Tool</h1>
      <ProjectCreationForm />
      <TaskManagement projects={projects} />
      {error && <p>Error: {error}</p>}
      <h2>Fetched Projects</h2>
      {data ? (
        <ul>
          {data.map(project => (
            <li key={project.id}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
