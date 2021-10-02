const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
const app = require('../../src/app');
const setupTestDB = require('../utils/setupTestDB');
const { Bob } = require('../../src/models');
const { bobOne, bobTwo, insertBobs } = require('../fixtures/bob.fixture');

setupTestDB();

describe('Bob routes', () => {
  describe('POST /v1/bobs', () => {
    let newBob;

    beforeEach(() => {
      newBob = {
        name: faker.name.findName(),
      };
    });

    test('should return 201 and successfully create new Bob if data is ok', async () => {
      const res = await request(app)
        .post('/v1/bobs')
        .send(newBob)
        .expect(httpStatus.CREATED);
      expect(res.body).toEqual({
        id: expect.anything(),
        name: newBob.name,
      });
      const dbBob = await Bob.findById(res.body.id);
      expect(dbBob).toBeDefined();
      expect(dbBob).toMatchObject({ name: newBob.name });
    });

    test('should return 400 error if name is invalid', async () => {
      newBob.name = '';
      await request(app)
        .post('/v1/bobs')
        .send(newBob)
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 error if name is already used', async () => {
      await insertBobs([bobOne]);
      newBob.name = bobOne.name;

      await request(app)
        .post('/v1/bobs')
        .send(newBob)
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe('GET /v1/bobs', () => {
    test('should return 200 and apply the default query options', async () => {
      await insertBobs([bobOne, bobTwo]);

      const res = await request(app)
        .get('/v1/bobs')
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 2,
      });
      expect(res.body.results).toHaveLength(2);
      expect(res.body.results[0]).toEqual({
        id: bobOne._id.toHexString(),
        name: bobOne.name,
      });
    });

    test('should correctly sort the returned array if descending sort param is specified', async () => {
      await insertBobs([bobOne, bobTwo]);

      const res = await request(app)
        .get('/v1/bobs')
        .query({ sortBy: 'role:desc' })
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 2,
      });
      expect(res.body.results).toHaveLength(2);
      expect(res.body.results[0].id).toBe(bobOne._id.toHexString());
      expect(res.body.results[1].id).toBe(bobTwo._id.toHexString());
    });

    test('should correctly sort the returned array if ascending sort param is specified', async () => {
      await insertBobs([bobOne, bobTwo]);

      const res = await request(app)
        .get('/v1/bobs')
        .query({ sortBy: 'role:asc' })
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 2,
      });
      expect(res.body.results).toHaveLength(2);
      expect(res.body.results[0].id).toBe(bobOne._id.toHexString());
      expect(res.body.results[1].id).toBe(bobTwo._id.toHexString());
    });

    test('should correctly sort the returned array if multiple sorting criteria are specified', async () => {
      await insertBobs([bobOne, bobTwo]);

      const res = await request(app)
        .get('/v1/bobs')
        .query({ sortBy: 'id:desc,name:asc' })
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 2,
      });
      expect(res.body.results).toHaveLength(2);

      const expectedOrder = [bobOne, bobTwo].sort((a, b) => {
        if (a.id < b.id) {
          return 1;
        }
        if (a.id > b.id) {
          return -1;
        }
        return a.name < b.name ? -1 : 1;
      });

      expectedOrder.forEach((Bob, index) => {
        expect(res.body.results[index].id).toBe(Bob._id.toHexString());
      });
    });

    test('should limit returned array if limit param is specified', async () => {
      await insertBobs([bobOne, bobTwo]);

      const res = await request(app)
        .get('/v1/bobs')
        .query({ limit: 1 })
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 1,
        totalPages: 2,
        totalResults: 2,
      });
      expect(res.body.results).toHaveLength(1);
      expect(res.body.results[0].id).toBe(bobOne._id.toHexString());
    });

    test('should return the correct page if page and limit params are specified', async () => {
      await insertBobs([bobOne, bobTwo]);

      const res = await request(app)
        .get('/v1/bobs')
        .query({ page: 2, limit: 1 })
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 2,
        limit: 1,
        totalPages: 2,
        totalResults: 2,
      });
      expect(res.body.results).toHaveLength(1);
      expect(res.body.results[0].id).toBe(bobTwo._id.toHexString());
    });
  });

  describe('GET /v1/bobs/:BobId', () => {
    test('should return 200 and the Bob object if data is ok', async () => {
      await insertBobs([bobOne]);

      const res = await request(app)
        .get(`/v1/bobs/${bobOne._id}`)
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        id: bobOne._id.toHexString(),
        name: bobOne.name,
      });
    });

    test('should return 400 error if BobId is not a valid mongo id', async () => {
      await insertBobs([bobTwo]);

      await request(app)
        .get('/v1/bobs/invalidId')
        .send()
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return 404 error if Bob is not found', async () => {
      await insertBobs([bobTwo]);

      await request(app)
        .get(`/v1/bobs/${bobOne._id}`)
        .send()
        .expect(httpStatus.NOT_FOUND);
    });
  });

  describe('DELETE /v1/bobs/:BobId', () => {
    test('should return 204 if data is ok', async () => {
      await insertBobs([bobOne]);

      await request(app)
        .delete(`/v1/bobs/${bobOne._id}`)
        .send()
        .expect(httpStatus.NO_CONTENT);

      const dbBob = await Bob.findById(bobOne._id);
      expect(dbBob).toBeNull();
    });

    test('should return 204 if trying to delete another Bob', async () => {
      await insertBobs([bobOne]);

      await request(app)
        .delete(`/v1/bobs/${bobOne._id}`)
        .send()
        .expect(httpStatus.NO_CONTENT);
    });

    test('should return 400 error if BobId is not a valid mongo id', async () => {
      await insertBobs([bobOne]);

      await request(app)
        .delete('/v1/bobs/invalidId')
        .send()
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return 404 error if Bob already is not found', async () => {
      await insertBobs([bobTwo]);

      await request(app)
        .delete(`/v1/bobs/${bobOne._id}`)
        .send()
        .expect(httpStatus.NOT_FOUND);
    });
  });

  describe('PATCH /v1/bobs/:BobId', () => {
    test('should return 200 and successfully update Bob if data is ok', async () => {
      await insertBobs([bobOne]);
      const updateBody = {
        name: faker.name.findName(),
      };

      const res = await request(app)
        .patch(`/v1/bobs/${bobOne._id}`)
        .send(updateBody)
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        id: bobOne._id.toHexString(),
        name: updateBody.name,
      });

      const dbBob = await Bob.findById(bobOne._id);
      expect(dbBob).toBeDefined();
      expect(dbBob).toMatchObject({ name: updateBody.name });
    });

    test('should return 404 if updating another Bob that is not found', async () => {
      await insertBobs([bobTwo]);
      const updateBody = { name: faker.name.findName() };

      await request(app)
        .patch(`/v1/bobs/${bobOne._id}`)
        .send(updateBody)
        .expect(httpStatus.NOT_FOUND);
    });

    test('should return 400 error if BobId is not a valid mongo id', async () => {
      await insertBobs([bobTwo]);
      const updateBody = { name: faker.name.findName() };

      await request(app)
        .patch(`/v1/bobs/invalidId`)
        .send(updateBody)
        .expect(httpStatus.BAD_REQUEST);
    });
  });
});
