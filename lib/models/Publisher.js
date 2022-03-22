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
      `, [id]
    );
    if(!rows[0]) return null;
    const publisher = new Publisher(rows[0]);
    return publisher;
  }
};
