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
    const res = await request(app)
      .post('/api/v1/reviewers')
      .send({ name: 'Bob Dylan', company: 'STAY ALIVE INC.' });

    const expected = {
      reviewer_id: expect.any(String),
      name: 'Bob Dylan',
      company: 'STAY ALIVE INC.',
    };
    expect(res.body).toEqual(expected);
  });

  it('fetch a list of all reviewers', async () => {
    await Reviewer.insert({
      name: 'Bob Dylan',
      company: 'STAY ALIVE INC.',
    });

    const expected = [
      { company: 'LRF', name: 'Jack', reviewer_id: '1' },
      { company: 'STAY ALIVE INC.', name: 'Bob Dylan', reviewer_id: '2' },
    ];

    const res = await request(app).get('/api/v1/reviewers');

    expect(res.body).toEqual(expected);
  });

  it('Gets a reviewer by id that includes all their reviews', async () => {
    const reviewer = await Reviewer.insert({
      name: 'Bob Dylan',
      company: 'STAY ALIVE INC.',
    });

    const expected = {
      reviewer_id: expect.any(String),
      name: 'Bob Dylan',
      company: 'STAY ALIVE INC.',
      review: expect.any(Array),
    };

    const res = await request(app).get(
      `/api/v1/reviewers/${reviewer.reviewer_id}`
    );

    expect(res.body).toEqual(expected);
  });

  it('Should update a reviewers data', async () => {
    const reviewer = await Reviewer.insert({
      name: 'Jaques',
      company: 'Beetle Juice Company',
    });

    const changes = {
      name: 'Jaques Bones',
    };

    const expected = {
      reviewer_id: expect.any(String),
      name: 'Jaques Bones',
      company: 'Beetle Juice Company',
    };

    const res = await request(app)
      .patch(`/api/v1/reviewers/${reviewer.reviewer_id}`)
      .send(changes);

    expect(res.body).toEqual(expected);
  });

  it('Should delete a reviewer if they don\'t have any reviews', async () => {
    const reviewer = await Reviewer.insert({
      name: 'Jaques',
      company: 'Beetle Juice Company',
    });

    const expected = {
      reviewer_id: expect.any(String),
      name: 'Jaques',
      company: 'Beetle Juice Company',
    };

    const res = await request(app).delete(`/api/v1/reviewers/${reviewer.reviewer_id}`);
    expect(res.body).toEqual(expected);
    expect(await Reviewer.getById(reviewer.reviewer_id)).toBeNull();
  });
});
