const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const authCustomerMiddleware = (req, res, next) => {

  const authHeader = req.header('Authorization');

  if (!authHeader) {
    console.error('No token provided');
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7, authHeader.length).trimLeft() : authHeader;


  console.log("hello");
  const decoded = jwt.verify(token, JWT_SECRET);
  req.customer = decoded.customer;
  console.log(decoded.customer);
  
  try {
    if (decoded.customer.role != 'customer') {
      return res.status(401).json({ msg: 'User is not a customer' });
    }
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token Uhmm is not valid' });
  }
};
  
  
module.exports = { authCustomerMiddleware};

  