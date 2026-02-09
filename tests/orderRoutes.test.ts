import request from 'supertest';
import app from '../src/app';

describe('Order API', () => {
  let createdOrderId: string;

  it('should create a new order', async () => {
    const orderData = {
      userDetails: { name: 'John Doe', address: '123 Street', phone: '123456789' },
      items: [{ menuItemId: 1, quantity: 2 }]
    };

    const response = await request(app).post('/api/order').send(orderData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    createdOrderId = response.body.id;
  });

  it('should update order status', async () => {
    const response = await request(app)
      .put('/api/order/status')
      .send({ id: createdOrderId, status: 'Preparing' });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('Preparing');
  });

  it('should fetch an order by id', async () => {
    const response = await request(app).get(`/api/orders/${createdOrderId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', createdOrderId);
    expect(response.body).toHaveProperty('status');
  });
});
