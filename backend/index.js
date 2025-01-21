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
  'http://localhost:3000', // Development
];

// Configure CORS
app.use(cors({
  origin: '*', // Allow all origins for debugging purposes
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true, // Allow cookies if necessary
}));


// Handle preflight requests explicitly
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(204);
});

// Middleware to parse JSON requests
app.use(express.json());

// Logging requests
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url} from origin ${req.headers.origin}`);
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
  console.error('Error encountered:', err.message);
  res.status(500).send({ error: err.message || 'Something went wrong!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
