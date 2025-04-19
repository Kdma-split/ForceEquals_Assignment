const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');

const authenticate = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization || req.cookies.accessToken;
    
    if (!authToken || !authToken.startsWith('Bearer ')) {
      return res.status(401).json({ 
        message: 'Authorization token required' 
      });
    }
    
    const token = authToken.split(' ')[1];
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      req.user = { userId: decoded.userId };
      
      next();
    } 
    catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired', expired: true });
      }
      
      return res.status(401).json({ message: 'Invalid token' });
    }  
  } 
  catch (error) {
    res.status(500).json({ message: 'Authentication error' });
  }
};

module.exports = authenticate;