import request from 'supertest';
import app from '../server.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

jest.mock('../models/User.js');
jest.mock('jsonwebtoken');

describe('Auth routes', () => {
  beforeEach(() => {
    User.countDocuments.mockResolvedValue(0);
    User.create.mockResolvedValue({ _id: '1', username: 'Guest1' });
    jwt.sign.mockReturnValue('token');
  });

  it('should create guest user', async () => {
    const res = await request(app).post('/api/auth/guest');
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
  });
});
