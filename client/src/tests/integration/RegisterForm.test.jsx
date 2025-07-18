import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import RegisterForm from '../../components/RegisterForm';
import '@testing-library/jest-dom';

const server = setupServer(
  rest.post('/api/auth/register', (req, res, ctx) => {
    const { email } = req.body;
    if (!email) return res(ctx.status(400), ctx.json({ error: 'Email is required' }));
    return res(ctx.status(201), ctx.json({ message: 'User registered' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('RegisterForm Integration', () => {
  it('registers a user successfully', async () => {
    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(screen.getByText(/user registered/i)).toBeInTheDocument();
    });
  });

  it('shows validation error on missing email', async () => {
    render(<RegisterForm />);
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });
  });
});