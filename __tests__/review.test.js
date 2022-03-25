const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Review = require('../lib/models/Review');

describe('local-bookstore routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create a review in the review table', async () => {
    const res = await request(app).post('/api/v1/reviews').send({
      rating: 5,
      reviewer_id: 1,
      review: 'This book was exquisite',
      book_id: 1,
    });
    
    const expected = {
      review_id: expect.any(String),
      reviewer_id: 1,
      rating: 5,
      review: 'This book was exquisite',
      book_id: 1,
    };

    expect(res.body).toEqual(expected);
  });

});
