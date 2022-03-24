const pool = require('../utils/pool');

module.exports = class Author {
  author_id;
  name;
  dob;
  pob;

  constructor(row) {
    this.author_id = row.author_id;
    this.name = row.name;
    this.dob = new Date(row.dob).toLocaleDateString('en-US');
    this.pob = row.pob;
  }

  static async getAll() {
    const { rows } = await pool.query(`
    SELECT
      *
    FROM
      author;`);

    const authors = rows.map((row) => new Author(row));
    return authors;
  }
};
