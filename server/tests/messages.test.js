import request from 'supertest';
import app from '../server.js';
import Message from '../models/Message.js';
import auth from '../middleware/auth.js';

jest.mock('../models/Message.js');
jest.mock('../middleware/auth.js', () => jest.fn((req, res, next) => {
  req.user = { id: '1' };
  next();
}));

describe('Messages routes', () => {
  beforeEach(() => {
    Message.find.mockResolvedValue([]);
  });

  it('should get messages', async () => {
    const res = await request(app).get('/api/messages/123');
    expect(res.statusCode).toBe(200);
  });
});
