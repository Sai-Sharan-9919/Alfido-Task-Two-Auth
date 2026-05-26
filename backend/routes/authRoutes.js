 
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Temporary array acting as our database
const users = []; 
const JWT_SECRET = "alfido_secret_key_2026"; 

// 1. SIGNUP ROUTE (Hash Password Securely)
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ error: "User already exists!" });
    }

    // Hash the password with a salt factor of 10
    const hashedPassword = await bcrypt.hash(password, 10);
    
    users.push({ email, password: hashedPassword });
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Registration failed." });
  }
});

// 2. LOGIN ROUTE (Verify Password & Issue JWT in Cookie)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Generate JWT token valid for 1 hour
    const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    // Store token inside an httpOnly cookie to prevent XSS attacks
    res.cookie('token', token, {
      httpOnly: true,     
      secure: false,      // Set to true in production with HTTPS
      sameSite: 'strict', 
      maxAge: 3600000     
    }).json({ message: "Login successful!", email: user.email });
    
  } catch (err) {
    res.status(500).json({ error: "Login failed." });
  }
});

// 3. LOGOUT ROUTE
router.post('/logout', (req, res) => {
  res.clearCookie('token').json({ message: "Logged out successfully!" });
});

module.exports = router;