const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const protect = require('./middleware/authMiddleware');

const app = express();
const PORT = 5000;

// Middleware parsing rules
app.use(express.json());
app.use(cookieParser()); // Enables backend to read incoming cookies safely

// Auth Routes endpoints entry
app.use('/api/auth', authRoutes);

// A Secure, Protected API Endpoint
app.get('/api/dashboard', protect, (req, res) => {
  res.json({ 
    message: "Welcome to the Secure Workspace Portal!", 
    secretData: "Project Financial Metrics: Alpha=$45k, Beta=$120k",
    user: req.user 
  });
});

app.listen(PORT, () => {
  console.log(`Backend Auth Server running smoothly on port ${PORT}`);
});