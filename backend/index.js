const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
const mongoDb = require('./db');
mongoDb();

// Middleware to parse JSON requests
app.use(express.json());

// CORS configuration
app.use((req, res, next) => {
  const allowedOrigins = [
    'https://gofood-frontend-fme9.onrender.com', // Your deployed frontend
    'http://localhost:3000' // Local development
  ];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin); // Echo the origin
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins (or restrict)
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // If you're using cookies

  // Handle OPTIONS preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
});

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
