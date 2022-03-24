const pool = require('../utils/pool');

module.exports = class Reviewer {
  reviewer_id;
  name;
  company;

  constructor(row) {
    this.reviewer_id = row.reviewer_id;
    this.name = row.name;
    this.company = row.company;
  }

  static async insert({ name, company }) {
    const { rows } = await pool.query(
      'INSERT INTO reviewer(name, company) VALUES ($1, $2) RETURNING *', [name, company] 
    );
    const reviewer = new Reviewer(rows[0]);
    return reviewer;
  }

  static async getAll() {
    const { rows } = await pool.query(
      `SELECT
          *
          FROM
          reviewer `
    );
    const reviewer = rows.map((row) => new Reviewer(row));
    return reviewer;
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        reviewer
      WHERE
        reviewer_id=$1
      `, [id]
    );
    const reviewer = new Reviewer(rows[0]);
    return reviewer;
  }

  async getReviews() {
    const { rows } = await pool.query(
      `
      SELECT
        review_id, rating, review, book.book_id, title
      FROM 
        book
        RIGHT JOIN review ON book.book_id = review.book_id
      WHERE
        reviewer_id=$1
      
      `, [this.reviewer_id]
    );
    this.review = rows;
    console.log('THISSSSSSSSS', this);
    return this;
  }
};
