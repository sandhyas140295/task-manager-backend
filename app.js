const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/tasks', taskRoutes);

// Global error handler
app.use(errorHandler);

module.exports = app;
