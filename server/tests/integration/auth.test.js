const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../src/app');
const User = require('../../src/models/User');

let mongoServer;

describe('Auth Routes', () => {
    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    afterEach(async () => {
        await User.deleteMany();
    });

    it('should fail login with incorrect password', async () => {
        await User.create({ email: 'test@example.com', password: 'password123' });

        const res = await request(app)
            .post('/api/auth/login')
            .send({ email: 'test@example.com', password: 'wrongpassword' });

        expect(res.status).toBe(401);
        expect(res.body.error).toMatch(/invalid credentials/i);
    });

    it('should validate missing fields on register', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({ password: 'abc123' });

        expect(res.status).toBe(400);
        expect(res.body.error).toMatch(/email is required/i);
    });
});