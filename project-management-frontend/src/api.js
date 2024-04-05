// api.js

const BASE_URL = 'http://localhost:3001'; 

export const getAllProjects = async () => {
  try {
    const response = await fetch(`${BASE_URL}/projects`);
    const projects = await response.json();
    console.log("Server response:", projects); 
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};


export const createProject = async (projectData) => {
  const response = await fetch(`${BASE_URL}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(projectData),
  });
  return response.json();
};

export const createTask = async (projectId, taskData) => {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ projectId, ...taskData }),
  });
  return response.json();
};

export const updateTask = async (taskId, updatedTaskData) => {
  try {
    const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTaskData),
    });
    if (!response.ok) {
      throw new Error('Failed to update task');
    }
    return response.json();
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};
