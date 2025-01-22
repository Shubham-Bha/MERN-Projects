const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
const mongoDb = require('./db');
mongoDb();

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData'));

// Root route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
