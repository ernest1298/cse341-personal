// app.js
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

// Load environment variables
dotenv.config();

// Passport configuration
require('./config/passport');  // Ensure this path points to your passport configuration file

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Express session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,  // Set this in .env
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Define main route
app.get('/', (req, res) => {
  res.send('Welcome to the Task Manager API');
});

// Task routes
app.use('/tasks', ensureAuthenticated, require('./routes/tasks')); // Protect tasks route

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Google OAuth login route
app.get('/auth/google', 
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth callback route
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard');  // Redirect to the dashboard after login
  }
);

// Logout route
app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

// Protected dashboard route (only accessible when logged in)
app.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.send(`Hello ${req.user.displayName}, welcome to your dashboard!`);
});

// Middleware to check if user is authenticated
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth/google'); // Redirect to login if not authenticated
}

// Set up the server to listen on a port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
