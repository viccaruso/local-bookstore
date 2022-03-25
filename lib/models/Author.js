const res = require('express/lib/response');
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

  static async insert({ name, dob, pob }) {
    const { rows } = await pool.query(
      `
    INSERT INTO
      author(name, dob, pob)
    VALUES($1, $2, $3)
    RETURNING
      *;`,
      [name, dob, pob]
    );

    if (!rows[0]) return null;
    const author = new Author(rows[0]);
    return author;
  }

  static async getAll() {
    const { rows } = await pool.query(`
    SELECT
      *
    FROM
      author;`);

    if (!rows[0]) return null;
    const authors = rows.map((row) => new Author(row));
    return authors;
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
    SELECT
      *
    FROM
      author
    WHERE
      author.author_id=$1;`,
      [id]
    );

    if (!rows[0]) return null;

    const author = new Author(rows[0]);
    return author;
  }

  async getBooks() {
    const { rows } = await pool.query(
      `
    SELECT
      book.book_id,
      book.title,
      book.released
    FROM
      book_author
    INNER JOIN
      book
    ON
      book_author.book_id = book.book_id
    WHERE
      book_author.author_id=$1
    `,
      [this.author_id]
    );

    this.books = rows;
    return this;
  }
};
