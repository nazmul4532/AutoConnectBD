const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

exports.verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    console.error("No token provided");
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

exports.isCustomer = (req, res, next) => {
  if (req.user.role != "customer") {
    return res.status(401).json({
      msg: "User is not a customer. Does not have access to this endpoint",
    });
  }

  next();
};

exports.isWorkshop = (req, res, next) => {
  if (req.user.role != "workshop") {
    return res.status(401).json({
      msg: "User is not a workshop. Does not have access to this endpoint",
    });
  }

  next();
};

exports.isFuelingStation = (req, res, next) => {
  if (req.user.role != "fuelingstation") {
    return res.status(401).json({
      msg: "User is not a Fueling Station. Does not have access to this endpoint",
    });
  }

  next();
};

exports.isCompany = (req, res, next) => {
  if (req.user.role != "company") {
    return res.status(401).json({
      msg: "User is not a Company. Does not have access to this endpoint",
    });
  }

  next();
};


exports.isCustomerOrWorkshop = (req, res, next) => {
  if (req.user.role != "workshop" || req.user.role != "customer") {
    return res.status(401).json({
      msg: "User is not a customer or a workshop. Does not have access to this endpoint",
    });
  }

  next();
};
