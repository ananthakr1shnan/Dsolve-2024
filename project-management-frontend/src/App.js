import React, { useState, useEffect } from 'react';
import { getAllProjects, createProject } from './api';
import ProjectCreationForm from './ProjectCreationForm';
import TaskManagement from './TaskManagement';

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getAllProjects();
      setProjects(data);
    }
    fetchData();
  }, []);

  const handleProjectCreation = async (newProjectData) => {
    try {
      const newProject = await createProject(newProjectData);
      setProjects([...projects, newProject]);
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return (
    <div>
      <h1>Project Management Tool</h1>
      <ProjectCreationForm onCreateProject={handleProjectCreation} />
      <TaskManagement projects={projects} />
      <h2>Projects</h2>
      <ul>
        {projects.map(project => (
          <li key={project.id}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
