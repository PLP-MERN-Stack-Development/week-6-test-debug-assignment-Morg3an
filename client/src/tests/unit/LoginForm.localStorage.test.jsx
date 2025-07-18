import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import LoginForm from '../../components/LoginForm';
import '@testing-library/jest-dom';

const server = setupServer(
    rest.post('/api/auth/login', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ token: 'mock-token' }));
    })
);

global.localStorage = {
    setItem: jest.fn(),
    getItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('LoginForm localStorage', () => {
    it('stores token in localStorage on successful login', async () => {
        render(<LoginForm />);
        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: 'password123' },
        });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => {
            expect(global.localStorage.setItem).toHaveBeenCalledWith('token', 'mock-token');
        });
    });
});