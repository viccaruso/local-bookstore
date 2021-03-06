const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const req = require('express/lib/request');
const Author = require('../lib/models/Author');
const Book = require('../lib/models/Book');

describe('local-bookstore routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should insert a new author', async () => {
    const author = {
      name: 'Robert Heinlein',
      dob: '7/7/1907',
      pob: 'Butler, MO',
    };

    const res = await request(app).post('/api/v1/authors').send(author);

    expect(res.body).toEqual({
      author_id: expect.any(String),
      name: 'Robert Heinlein',
      dob: '7/7/1907',
      pob: 'Butler, MO',
    });
  });

  it('should list all authors', async () => {
    const author = [
      {
        author_id: expect.any(String),
        name: 'Robert Heinlein',
        dob: '7/7/1907',
        pob: 'Butler, MO',
      },
    ];

    const res = await request(app).get('/api/v1/authors');

    expect(res.body).toEqual(author);
  });

  it('should get a single author by id', async () => {
    await Book.insert({
      title: 'Stranger in a Strange Land',
      publisher_id: 1,
      released: 1975,
    });

    const res = await request(app).get('/api/v1/authors/1');

    expect(res.body).toEqual({
      author_id: expect.any(String),
      name: 'Robert Heinlein',
      dob: '7/7/1907',
      pob: 'Butler, MO',
      books: [
        {
          book_id: expect.any(String),
          title: 'Stranger in a Strange Land',
          released: 1975,
        },
      ],
    });
  });
});
