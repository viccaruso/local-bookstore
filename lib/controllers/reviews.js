const { Router } = require('express');
const Review = require('../models/Review');

module.exports = Router()
  .post('/', async (req, res) => {
    res.send(await Review.insert(req.body));
  });
