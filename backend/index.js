const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
const mongoDb = require('./db');
mongoDb();

// Define allowed origins
const allowedOrigins = [
  'https://gofood-frontend-fme9.onrender.com',
  'http://localhost:3000' // Development
];

// Configure CORS (Before Routes)
app.use(cors({
  origin: (origin, callback) => {
    console.log('Origin:', origin);  // Log the origin of the request for debugging
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true, // Allow cookies if necessary
}));

// Handle preflight requests for all routes
app.options('*', cors()); // Enable CORS for all routes

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
