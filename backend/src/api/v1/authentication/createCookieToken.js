const generateToken = require("../../../Utils/generateToken");




const createCookieToken = async (req, res) => {
  const user = req.body;
  const token = generateToken(user)
  res.send({ token });
};


module.exports = createCookieToken;