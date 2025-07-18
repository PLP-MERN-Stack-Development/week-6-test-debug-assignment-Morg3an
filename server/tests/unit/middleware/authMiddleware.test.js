const { protect } = require('../../../src/middleware/authMiddleware');
const httpMocks = require('node-mocks-http');
const jwt = require('jsonwebtoken');

describe('authMiddleware - protect', () => {
  it('should call next() if token is valid', async () => {
    const userId = 'testUserId';
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET);

    const req = httpMocks.createRequest({
      headers: { authorization: `Bearer ${token}` },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await protect(req, res, next);

    expect(req.user).toBeDefined();
    expect(req.user.id).toBe(userId);
    expect(next).toHaveBeenCalled();
  });

  it('should return 401 if no token is provided', async () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await protect(req, res, next);

    expect(res.statusCode).toBe(401);
  });
});