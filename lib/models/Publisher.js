const pool = require('../utils/pool');

module.exports = class Publisher {
  publisher_id;
  name;
  city;
  state;
  country;

  constructor(row) {
    this.publisher_id = row.publisher_id;
    this.name = row.name;
    this.city = row.city;
    this.state = row.state;
    this.country = row.country;
  }
  static async insert({ name, city, state, country }) {
    const { rows } = await pool.query(
      `
            INSERT INTO publisher(name, city, state, country) VALUES ($1, $2, $3, $4) RETURNING *
            `,
      [name, city, state, country]
    );

    if (!rows[0]) return null;
    const publisher = new Publisher(rows[0]);
    return publisher;
  }

  static async getAll() {
    const { rows } = await pool.query(
      `SELECT
      publisher_id, name
      FROM
      publisher
      `
    );
    
    if (!rows[0]) return null;
    const publisher = rows.map((row) => new Publisher(row));
    return publisher;
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT
      *
      FROM
      publisher
      WHERE
      publisher_id=$1
      `,
      [id]
    );
    if (!rows[0]) return null;
    const publisher = new Publisher(rows[0]);
    return publisher;
  }

  async getBooks() {
    const { rows } = await pool.query(
      `
    SELECT
      book_id, title
    FROM
      publisher
    LEFT JOIN
      book
    ON
      book.publisher_id = publisher.publisher_id
    WHERE
      book.publisher_id=$1`,
      [this.publisher_id]
    );

    this.books = rows;

    return this;
  }
};
