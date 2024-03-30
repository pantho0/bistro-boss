const Review = require("../../../models/Reviews.models");

const reviews = async (req, res) => {
  const result = await Review.find();
  res.send(result);
};

module.exports = reviews
