// server.js

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

let projects = [];

app.get('/projects', (req, res) => {
  res.json(projects);
});

app.post('/projects', (req, res) => {
  const { title, description, tasks } = req.body;
  const newProject = { id: projects.length + 1, title, description, tasks };
  projects.push(newProject);
  res.status(201).json(newProject);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
