// api.js

const BASE_URL = 'http://localhost:3001'; // Update with your backend URL

export const getAllProjects = async () => {
  const response = await fetch(`${BASE_URL}/projects`);
  return response.json();
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
