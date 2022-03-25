const { Router } = require('express');

const Reviewer = require('../models/Reviewer');

module.exports = Router()
  .post('/', async (req, res) => {
    res.send(await Reviewer.insert(req.body));
  })

  .get('/', async (req, res) => {
    res.send(await Reviewer.getAll());
  })

  .get('/:id', async (req, res) => {
    res.send(await (await Reviewer.getById(req.params.id)).getReviews());
  })

  .patch('/:id', async (req, res) => {
    const reviewer = await Reviewer.updateById(req.params.id, req.body);
    res.send(reviewer);
  })
  
  .delete('/:id', async (req, res) => {
    res.send(await Reviewer.delete(req.params.id));
  });
