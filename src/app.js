const express = require('express');
const populationRoutes = require('./routes/populationRoute');
const { startScheduler } = require('./cron/scheduler');

const app = express();
app.use(express.json());

app.use('/api', populationRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT);
startScheduler();

module.exports = app;