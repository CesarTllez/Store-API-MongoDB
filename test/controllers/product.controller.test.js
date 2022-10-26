import { describe, expect, it } from 'vitest';
import request from 'supertest';
import app from '../../src/app';

describe('/api/v1/products', () => {
  const endPoint = '/api/v1/products';
  const endPointWithId = (idMocked) => `${endPoint}/${idMocked}`;

  describe('GET', () => {
    it('should respond with status code 200', async () => {
      const response = await request(app).get(endPoint).send();
      expect(response.statusCode).toBe(200);
    });

    it('should respond with an array', async () => {
      const response = await request(app).get(endPoint).send();
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('GET by ID', () => {
    it('should respond with status code 200', async () => {
      const idMocked = '62cfa31acd2c601820c52988';
      const response = await request(app).get(endPointWithId(idMocked)).send();
      expect(response.statusCode).toBe(200);
    });

    it('should respond with an object', async () => {
      const idMocked = '62cfa2b4cd2c601820c52982';
      const response = await request(app).get(endPointWithId(idMocked)).send();
      expect(response.body).toBeTypeOf('object');
    });

    it('should respond with status code 404 if the product ID does not exist', async () => {
      const idMocked = '1';
      const response = await request(app).get(endPointWithId(idMocked)).send();
      expect(response.statusCode).toBe(404);
    });
  });

  describe('POST', () => {
    it.skip('should respond with status code 201', async () => {
      const productMocked = {
        name: 'New product',
        price: 5000,
        categoryId: '62cfa276cd2c601820c5297b',
      };
      const response = await request(app).post(endPoint).send(productMocked);
      expect(response.statusCode).toBe(201);
    });
  });

  describe('PUT', () => {
    it.skip('should respond with status code 200', async () => {
      const idMocked = '62cfa31acd2c601820c52988';
      const productMocked = {
        name: 'Updated product',
        price: 4500,
      };
      const response = await request(app)
        .put(endPointWithId(idMocked))
        .send(productMocked);
      expect(response.statusCode).toBe(200);
    });

    it('should respond with status code 404 if the product ID does not exist', async () => {
      const idMocked = '1';
      const productMocked = {
        name: 'Updated product',
        price: 4500,
      };
      const response = await request(app)
        .put(endPointWithId(idMocked))
        .send(productMocked);
      expect(response.statusCode).toBe(404);
    });
  });

  describe('DELETE by ID', () => {
    it.skip('should respond with status code 204', async () => {
      const idMocked = '63599efd7d07d89f5fbf7b0d';
      const response = await request(app)
        .delete(endPointWithId(idMocked))
        .send();
      expect(response.statusCode).toBe(204);
    });

    it('should respond with status code 404 if the product ID does not exist', async () => {
      const idMocked = '1';
      const response = await request(app)
        .delete(endPointWithId(idMocked))
        .send();
      expect(response.statusCode).toBe(404);
    });
  });
});
