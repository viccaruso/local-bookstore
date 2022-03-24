const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const req = require('express/lib/request');

describe('local-bookstore routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should list all authors', async () => {
    const author = [
      {
        author_id: expect.any(String),
        name: 'Robert Heinlein',
        dob: 'July 07, 1907',
        pob: 'Butler, MO',
      },
    ];

    const res = await request(app).get('/api/v1/authors');

    expect(res.body).toEqual(author);
  });
});
