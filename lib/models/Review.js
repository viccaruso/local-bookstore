const pool = require('../utils/pool');

module.exports = class Review {
  review_id;
  rating;
  reviewer_id;
  review;
  book_id;

  constructor(row) {
    this.review_id = row.review_id;
    this.rating = row.rating;
    this.reviewer_id = row.reviewer_id;
    this.review = row.review;
    this.book_id = row.book_id;
  }

};
