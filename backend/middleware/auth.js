// JWT token check karne ke liye middleware
// Ye ensure karta hai ki sirf logged-in admin hi protected routes access kar sake
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const protect = async (req, res, next) => {
  let token;

  // Authorization header mein Bearer token hona chahiye
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Admin DB se fetch karo (password ke bina)
      req.admin = await Admin.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.error('Token invalid:', error.message);
      res.status(401).json({ message: 'Invalid token, access denied' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'No token provided, access denied' });
  }
};

module.exports = { protect };
