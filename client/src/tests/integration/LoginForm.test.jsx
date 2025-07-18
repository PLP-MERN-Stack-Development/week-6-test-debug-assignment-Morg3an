import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import LoginForm from '../../components/LoginForm';

const server = setupServer(
    rest.post('/api/auth/login', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ token: 'mock-token' }));
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('LoginForm Integration', () => {
    it('should login successfully and receive a token', async () => {
        render(<LoginForm />);

        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: 'user@example.com' },
        });
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: 'password123' },
        });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => {
            expect(screen.getByText(/logged in/i)).toBeInTheDocument();
        });
    });
});