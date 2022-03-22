const { Router } = require('express');
const pool = require('../utils/pool');

const Publisher = require('../models/Publisher');

module.exports = Router ()
  .post('/', async (req, res) => {
    const publisher = await Publisher.insert(req.body);
    res.send(publisher);
  })

  .get('/', async (rec, res) => {
    const publisher = await Publisher.getAll();

    res.send(publisher);
  });
