const jwt = require('jsonwebtoken');

module.exports = authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Auth error' });
    } else {
      const decoded = await jwt.verify(token, 'secret')
      req.user = decoded;
      next();
    }
  } catch (error) {
    return res.status(401).json({ message: 'Auth error' })
  }
}
