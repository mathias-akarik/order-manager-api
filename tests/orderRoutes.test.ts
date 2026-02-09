//root/tests/orderRoutes
import request from 'supertest';
import app from '../src/app';

describe('POST /order', () => {
  it('should create a new order', async () => {
    const orderData = {
      userDetails: { name: 'John Doe', address: '123 Street', phone: '123456789' },
      items: [{ menuItemId: 1, quantity: 2 }],
    };
    const response = await request(app).post('/order').send(orderData);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
});

describe('PUT /order/status', () => {
  it('should update order status', async () => {
    const orderData = { id: 1, status: 'Preparing' };
    const response = await request(app).put('/order/status').send(orderData);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('Preparing');
  });
});
