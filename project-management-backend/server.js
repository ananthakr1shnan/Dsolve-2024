// server.js

const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Fetch projects from Google Sheets
app.get('/projects', async (req, res) => {
  try {
    const response = await axios.get(process.env.SHEETY_API_ENDPOINT_PROJECTS);
    const projects = response.data;
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create a new project in Google Sheets
app.post('/projects', async (req, res) => {
  try {
    const { title, description, objectives } = req.body;

    // Send project data to Sheety API endpoint for creating projects
    const response = await axios.post(process.env.SHEETY_API_ENDPOINT_PROJECTS, {
      project: { title, description, objectives }
    });

    // Return the response from Sheety API back to the client
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
