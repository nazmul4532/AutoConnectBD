const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const authCustomerMiddleware = (req, res, next) => {

  const authHeader = req.header('Authorization');

  if (!authHeader) {
    console.error('No token provided');
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    console.log(decoded.user);
    if (decoded.user.role != 'customer') {
      return res.status(401).json({ msg: 'User is not a customer. Does not have access to this endpoint' });
    }
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};


const authWorkshopMiddleware = (req, res, next) => {

  const authHeader = req.header('Authorization');

  if (!authHeader) {
    console.error('No token provided');
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    console.log(decoded.user);
    if (decoded.user.role != 'workshop') {
      return res.status(401).json({ msg: 'User is not a workshop. Does not have access to this endpoint' });
    }
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
  
  
module.exports = { authCustomerMiddleware, authWorkshopMiddleware};

  