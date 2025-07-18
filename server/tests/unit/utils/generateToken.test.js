// tests/unit/utils/generateToken.test.js
const { generateToken } = require('../../../src/utils/auth');
const jwt = require('jsonwebtoken');

describe('generateToken', () => {
  it('should generate a valid JWT token', () => {
    const userId = '12345';
    const token = generateToken(userId);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    expect(decoded.id).toBe(userId);
  });
});