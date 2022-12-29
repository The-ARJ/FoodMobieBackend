const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(401).json({ auth: false, message: 'No token provided.' });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
    }
    req.user = decoded;
    next();
  });
};

module.exports = {
  validateToken
};
