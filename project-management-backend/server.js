const express = require('express');
const cors = require("cors")
const axios = require('axios');
const { url } = require('inspector');
// const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3001;
// app.use(bodyParser);
app.use(express.json());
app.use(cors())
// Middleware to set CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Fetch projects from Google Sheets
app.post('/projects', async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.body);

    const resp = await axios.get("https://api.sheety.co/337898d042c47933efc052bf69d5e136/project/sheet2");
    console.log(resp);
  const response = await axios.post("https://api.sheety.co/337898d042c47933efc052bf69d5e136/project/sheet2", {
    sheet2: {
      "projectid": req.body.projectId,
      "title": req.body.title,
      "description": req.body.description,
      "status": req.body.status,
      "assignedto": req.body.assignedTo,
      "deadline": req.body.deadline
    }
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  console.log(response);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/tasks', async (req, res) => {
    try {
      console.log(req.body);
      console.log(req.body);
  
      const resp = await axios.get("https://api.sheety.co/337898d042c47933efc052bf69d5e136/project/sheet3");
      console.log(resp);
    const response = await axios.post("https://api.sheety.co/337898d042c47933efc052bf69d5e136/project/sheet3", {
      sheet3: {
        "taskId":req.body.taskId,
        "projectId": req.body.projectId,
        "description": req.body.description,
        "assignedTo": req.body.assignedTo,
        "deadline": req.body.deadline,
        "status": req.body.status
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(response);
    } catch (error) {
      console.error('Error fetching projects:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

  

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
