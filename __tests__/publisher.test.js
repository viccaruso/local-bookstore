const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('local-bookstore routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('Should insert new publisher into publisher table', async () => {
    const res = await request(app)
    .post('/api/v1/publishers')
    .send({ 
      name: 'Danial J. Barrett', 
      city: 'New York', 
      state: 'NY', 
      country: 'SW'})

      const expected = {
        id: expect.any(String),
        name: 'Danial J. Barrett', 
        city: 'New York', 
        state: 'NY', 
        country: 'SW'
      };
      expect(res.body).toEqual(expected)
  })

});
