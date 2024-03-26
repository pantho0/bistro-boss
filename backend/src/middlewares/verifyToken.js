const { JsonWebTokenError } = require("jsonwebtoken");
require("dotenv").config();


const verifyToken = (req, res, next) => {
    if (!req.headers.authorization) {
      return res.status(401).send({ message: "Forbidden Access" });
    }
    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Forbidden Access" });
      }
      req.decoded = decoded;
      next();
    });
  };

  module.exports = verifyToken;