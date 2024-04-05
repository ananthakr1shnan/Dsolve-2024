import React, { useState, useEffect } from 'react';
import { getAllProjects, createTask } from './api';

const TaskManagement = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [newTask, setNewTask] = useState({ description: '', assignedTo: '', deadline: '', status: '' });

  useEffect(() => {
    // Fetch projects from the backend
    const fetchProjects = async () => {
      const projectsData = await getAllProjects();
      setProjects(projectsData);
    };
    fetchProjects();
  }, []);

  const handleProjectChange = (projectId) => {
    setSelectedProject(projectId);
  };

  const handleTaskChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProject) return; // Ensure project is selected
    try {
      // Send task data to the backend
      await createTask(selectedProject, newTask);
      // Reset form fields
      setNewTask({ description: '', assignedTo: '', deadline: '', status: '' });
      // Fetch updated projects data
      const updatedProjects = await getAllProjects();
      setProjects(updatedProjects);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div>
      <h2>Task Management</h2>
      <select onChange={(e) => handleProjectChange(e.target.value)}>
        <option value="">Select a Project</option>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>{project.title}</option>
        ))}
      </select>
      {selectedProject && (
        <form onSubmit={handleSubmit}>
          <input type="text" name="description" value={newTask.description} onChange={handleTaskChange} placeholder="Task description" />
          <input type="text" name="assignedTo" value={newTask.assignedTo} onChange={handleTaskChange} placeholder="Assignee" />
          <input type="date" name="deadline" value={newTask.deadline} onChange={handleTaskChange} />
          <select name="status" value={newTask.status} onChange={handleTaskChange}>
            <option value="">Select status</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>
          <button type="submit">Add Task</button>
        </form>
      )}
    </div>
  );
};

export default TaskManagement;
