const { Router } = require('express');
const pool = require('../utils/pool');

const Reviewer = require('../models/Reviewer');

module.exports = Router()
  .post('/', async (req, res) => {
    res.send(await Reviewer.insert(req.body));
  });

