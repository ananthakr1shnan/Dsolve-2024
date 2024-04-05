import React, { useState } from 'react';
import axios from 'axios';

const ProjectCreationForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'In Progress',
    assignedTo: '',
    deadline: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/projects', formData);
      const newProject = response.data;
      console.log('New project created:', newProject);
      // Optionally, provide feedback to the user or navigate to project details page
    } catch (error) {
      console.error('Error creating project:', error);
      // Optionally, display error message to the user
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" name="title" value={formData.title} onChange={handleChange} />
      </label>
      <label>
        Description:
        <input type="text" name="description" value={formData.description} onChange={handleChange} />
      </label>
      <label>
        Status:
        <input type="text" name="status" value={formData.status} onChange={handleChange} />
      </label>
      <label>
        Assigned To:
        <input type="text" name="assignedTo" value={formData.assignedTo} onChange={handleChange} />
      </label>
      <label>
        Deadline:
        <input type="text" name="deadline" value={formData.deadline} onChange={handleChange} />
      </label>
      <button type="submit">Create Project</button>
    </form>
  );
};

export default ProjectCreationForm;
