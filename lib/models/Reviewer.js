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
      'INSERT INTO reviewer(name, company) VALUES ($1, $2) RETURNING *',
      [name, company]
    );

    if (!rows[0]) return null;
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

    if (!rows[0]) return null;
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
      `,
      [id]
    );
    if (!rows[0]) return null;
    const reviewer = new Reviewer(rows[0]);
    return reviewer;
  }

  static async updateById(id, updates) {
    const reviewer = await Reviewer.getById(id);
    if (!reviewer) return null;

    const name = updates.name ?? reviewer.name;
    const company = updates.company ?? reviewer.company;

    const { rows } = await pool.query(
      `
      UPDATE reviewer SET name=$1, company=$2 WHERE reviewer_id=$3 RETURNING *
      `,
      [name, company, id]
    );

    if (!rows[0]) return null;
    const updatedReviewer = new Reviewer(rows[0]);
    return updatedReviewer;
  }

  static async delete(id) {
    const reviewer = await Reviewer.getById(id);
    const reviews = reviewer.getReviews();
    if (!reviews.length) {
      const { rows } = await pool.query(
        `
      DELETE FROM
        reviewer
      WHERE
        reviewer_id=$1
      RETURNING
        *
      `, [id]
      );
      
      if (!rows[0]) return null;
      return new Reviewer(rows[0]);
    }

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
      
      `,
      [this.reviewer_id]
    );
    this.review = rows;
    return this;
  }
};
