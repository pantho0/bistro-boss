const express = require('express');
const Review = require('../../models/Reviews.models');
const reviews = require('../../api/v1/reviews/reviews');
const router = express.Router()

router.get("/reviews", reviews);

  module.exports = router;