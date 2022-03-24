const { Router } = require('express');
const Book = require('../models/Book');

module.exports = Router()
  .post('/', async (req, res) => {
    const book = await Book.insert(req.body);
    res.send(book);
  })

  .get('/', async (req, res) => {
    const books = await Book.getAll();
    res.send(books);
  })

  .get('/:id', async (req, res) => {
    const books = await Book.getById(req.params.id);
    const bookAuthor = await books.getBookDetails();
    res.send(bookAuthor);
  });
