const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Publisher = require('../lib/models/Publisher');

describe('local-bookstore routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('Should insert new publisher into publisher table', async () => {
    const res = await request(app).post('/api/v1/publishers').send({
      name: 'Danial J. Barrett',
      city: 'New York',
      state: 'NY',
      country: 'SW',
    });
    console.log(res.body);
    const expected = {
      publisher_id: expect.any(String),
      name: 'Danial J. Barrett',
      city: 'New York',
      state: 'NY',
      country: 'SW',
    };
    expect(res.body).toEqual(expected);
  });

  it('should fetch a list of all publishers', async () => {
    await Publisher.insert({ name: 'Danial J. Barrett',
      city: 'New York',
      state: 'NY',
      country: 'SW', });
    await Publisher.insert({ name: 'Michael Brady',
      city: 'Detroit',
      state: 'MI',
      country: 'US', });

    const expected = [{
      publisher_id: expect.any(String),
      name: 'Danial J. Barrett',
      
    }, {
      publisher_id: expect.any(String),
      name: 'Michael Brady',
    }];

    const res = await request(app).get(
      '/api/v1/publishers'
    );
    expect(res.body).toEqual(expected);


  });

  it('should fetch a single publisher by id', async () => {
    const publisher = await Publisher.insert({ name:  'Danial J. Barrett',
      city: 'New York',
      state: 'NY',
      country: 'SW', });

    const expected = {
      publisher_id: expect.any(String),
      name: 'Danial J. Barrett',
      city: 'New York',
      state: 'NY',
      country: 'SW',
    };

    const res = await request(app).get(`/api/v1/publishers/${publisher.publisher_id}`);

    expect(res.body).toEqual(expected);
  });
});
