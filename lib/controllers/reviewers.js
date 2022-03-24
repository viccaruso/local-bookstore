const { Router } = require('express');
const pool = require('../utils/pool');

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
  });
