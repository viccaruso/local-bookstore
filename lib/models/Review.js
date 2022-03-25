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

  static async delete(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM
        review
      WHERE
        review_id=$1
      RETURNING
        *
      `, [id]
    );
    if (!rows[0]) return null;
    return new Review(rows[0]);
  }

  async getBookData() {
    const { rows } = await pool.query(
      `
      SELECT
        title
      FROM
        book
      WHERE
        book_id=$1
      `,
      [this.book_id]
    );
    if (!rows[0]) return null;
    this.book_title = rows[0].title;
    return this;
  }
};
