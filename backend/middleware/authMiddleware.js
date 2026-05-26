const jwt = require('jsonwebtoken');
const JWT_SECRET = "alfido_secret_key_2026"; 

const protect = (req, res, next) => {
  // Grab the token automatically from the cookies
  const token = req.cookies.token; 

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token found." });
  }

  try {
    // Verify the token validity
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified; // Attach user email payload to request object
    next(); // Let the user through to the API route
  } catch (err) {
    res.status(403).json({ error: "Invalid or expired token." });
  }
};

module.exports = protect;