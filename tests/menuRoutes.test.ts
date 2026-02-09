import request from 'supertest';
import app from '../src/app';

describe('GET /api/menu', () => {
  it('should return a list of menu items', async () => {
    const response = await request(app).get('/api/menu');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
