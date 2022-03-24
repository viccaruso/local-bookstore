const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Reviewer = require('../lib/models/Reviewer');


describe('local-bookstore routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should be able insert a new reviwer into reviewer', async () => {
    const res = await request(app).post('/api/v1/reviewers').send({ name: 'Bob Dylan', company: 'STAY ALIVE INC.' });

    const expected = {
      reviewer_id: expect.any(String),
      name: 'Bob Dylan',
      company: 'STAY ALIVE INC.'
    };
    expect(res.body).toEqual(expected);

  });

  it('fetch a list of all reviewers', async () => {
    const reviewer = await Reviewer.insert({
      name: 'Bob Dylan', company: 'STAY ALIVE INC.'
    });

    const expected = {
      reviewer_id: expect.any(String),
      name: 'Bob Dylan',
      company: 'STAY ALIVE INC.'
    };

    const res = await request(app).get(`/api/v1/reviewers/${reviewer.reviewer_id}`);

    expect(res.body).toEqual(expected);
  });
});
