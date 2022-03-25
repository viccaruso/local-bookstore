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
    const bookAuthor = await books.getBookAuthor();
    const bookPublisher = await bookAuthor.getBookPublisher();
    const bookReviews = await bookPublisher.getBookReviews();

    const data = {
      book_id: bookReviews.book_id,
      title: bookReviews.title,
      released: bookReviews.released,
      publisher: {
        publisher_id: bookReviews.publisher.publisher_id,
        name: bookReviews.publisher.name,
      },
      authors: [
        {
          author_id: bookReviews.authors[0].author_id,
          name: bookReviews.authors[0].name,
        },
      ],
      reviews: [
        {
          review_id: bookReviews.reviews[0].review_id,
          rating: bookReviews.reviews[0].rating,
          review: bookReviews.reviews[0].review,
          reviewer: {
            reviewer_id: bookReviews.reviews[0].reviewer_id,
            name: bookReviews.reviews[0].name,
          },
        },
      ],
    };

    res.send(data);
  });
