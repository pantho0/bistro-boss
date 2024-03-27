require("dotenv").config();
const jwt = require("jsonwebtoken");

const generateToken = (user) =>{
    return jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, {
        expiresIn: "1h",
      });
}


module.exports = generateToken;