const { Router } = require('express');
const Review = require('../models/Review');

module.exports = Router()
  .post('/', async (req, res) => {
    res.send(await Review.insert(req.body));
  })

  .get('/', async (req, res) => {
    const reviews = await Review.getAll();
    const reviewWithBook = await Promise.all(
      reviews.map((review) => review.getBookData())
    );
    res.send(reviewWithBook);
  })
  
  .delete('/:id', async (req, res) => {
    res.send(await Review.delete(req.params.id));
  });
