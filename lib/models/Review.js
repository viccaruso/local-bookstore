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

  static async insert({ rating, reviewer_id, review, book_id }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
        review (rating, reviewer_id, review, book_id)
      VALUES 
        ($1, $2, $3, $4)
      RETURNING
        *
      `,
      [rating, reviewer_id, review, book_id]
    );
    console.log('FKKFDSF', rows);
    return new Review(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
      SELECT 
        * 
      FROM 
        review
      ORDER BY
        rating DESC
      LIMIT 
        100
      `
    );

    const reviews = rows.map((row) => new Review(row));
    return reviews;
  }
};
