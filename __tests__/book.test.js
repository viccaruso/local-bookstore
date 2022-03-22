const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Book = require('../lib/models/Book');
const req = require('express/lib/request');

describe('local-bookstore routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('Posts a new book to book table', async () => {
    const expected = {
      book_id: expect.any(String),
      title: 'Stranger in a Strange Land',
      publisher_id: expect.any(String),
      released: 1975,
    };

    const book = {
      title: 'Stranger in a Strange Land',
      publisher_id: 1,
      released: 1975,
    };

    const res = await request(app).post('/api/v1/books').send(book);
    expect(res.body).toEqual(expected);
  });

  it('Should fetch all books from db', async () => {
    const expected = [
      {
        book_id: expect.any(String),
        title: 'Stranger in a Strange Land',
        publisher_id: 1,
        released: 1975,
        publisher: {
          publisher_id: expect.any(String),
          name: 'Fleming & Rezac, Inc.',
        },
      },
    ];
    const res = await request(app).get('/api/v1/books');
    expect(res.body).toEqual(expected);
  });
});
