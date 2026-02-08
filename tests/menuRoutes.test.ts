import request from 'supertest';
import app from '../src/server'; // Adjusted import path

describe('GET /menu', () => {
  it('should return a list of menu items', async () => {
    const response = await request(app).get('/menu');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2); // Based on the sample menu items
  });
});
