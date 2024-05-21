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
    req.customer = decoded.customer;
    console.log(decoded.customer);
    if (decoded.customer.role != 'customer') {
      return res.status(401).json({ msg: 'User is not a customer' });
    }
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
  
  
module.exports = { authCustomerMiddleware};

  