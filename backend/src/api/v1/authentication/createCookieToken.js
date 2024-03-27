const jwt = require("jsonwebtoken");

require("dotenv").config();

const createCookieToken = async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, {
    expiresIn: "1h",
  });
  res.send({ token });
};


module.exports = createCookieToken;