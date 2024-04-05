import React, { useState } from 'react';
import { createTask } from './api';

const TaskManagement = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState('');
  const [newTask, setNewTask] = useState({ description: '', assignedTo: '', deadline: '', status: '' });

  const handleProjectChange = (projectId) => {
    setSelectedProject(projectId);
  };

  const handleTaskChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProject) return;
    try {
      await createTask(selectedProject, newTask);
      setNewTask({ description: '', assignedTo: '', deadline: '', status: '' });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div>
      <h2>Task Management</h2>
      <select onChange={(e) => handleProjectChange(e.target.value)}>
        <option value="">Select a Project</option>
        {projects.length > 0 && projects.map((project) => (
          <option key={project.id} value={project.id}>{project.title}</option>
        ))}
      </select>
      {selectedProject && (
        <form onSubmit={handleSubmit}>
         <input type="text" name="taskId" value={newTask.taskId} onChange={handleTaskChange} placeholder="Task Id" />
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
