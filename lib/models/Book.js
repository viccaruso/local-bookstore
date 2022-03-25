const pool = require('../utils/pool');

module.exports = class Book {
  book_id;
  title;
  publisher_id;
  released;

  constructor(row) {
    this.book_id = row.book_id;
    this.title = row.title;
    this.publisher_id = row.publisher_id;
    this.released = row.released;
  }

  static async insert({ title, publisher_id, released }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
        book (title, publisher_id, released)
      VALUES
        ($1, $2, $3)
      RETURNING
        *
      `,
      [title, publisher_id, released]
    );
    return new Book(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
      SELECT * FROM book 
      `
    );
    const books = rows.map((row) => new Book(row));
    return books;
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT
       *
      FROM 
        book 
      WHERE 
        book_id=$1
      `,
      [id]
    );
    if (!rows[0]) return null;
    const book = new Book(rows[0]);
    return book;
  }

  async getBookAuthor() {
    const { rows } = await pool.query(
      `
      SELECT
        author.author_id,
        author.name
      FROM
        author 
      INNER JOIN
        book_author
      ON
        book_author.author_id = author.author_id
      INNER JOIN
        book
      ON
        book.book_id = book_author.book_id
      WHERE 
        book.book_id=$1;
      `,
      [this.book_id]
    );
    this.authors = rows;

    return this;
  }

  async getBookPublisher() {
    const { rows } = await pool.query(
      `
      SELECT
        publisher.name,
        publisher.publisher_id
      from
        publisher
      INNER JOIN 
        book
      ON
        publisher.publisher_id = book.publisher_id
      WHERE
        book.publisher_id=$1
      `,
      [this.publisher_id]
    );
    this.publisher = rows[0];
    console.log('CHECK THIS', this);
    return this;
  }
};
