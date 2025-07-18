import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import PostForm from '../../components/PostForm';
import '@testing-library/jest-dom';

const server = setupServer(
    rest.post('/api/posts', (req, res, ctx) => {
        const { title } = req.body;
        if (!title) return res(ctx.status(400), ctx.json({ error: 'Title required' }));
        return res(ctx.status(201), ctx.json({ message: 'Post created' }));
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('PostForm Integration', () => {
    it('creates a post successfully', async () => {
        render(<PostForm />);

        fireEvent.change(screen.getByLabelText(/title/i), {
            target: { value: 'New Post' },
        });
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        await waitFor(() => {
            expect(screen.getByText(/post created/i)).toBeInTheDocument();
        });
    });

    it('shows validation error on missing title', async () => {
        render(<PostForm />);
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        await waitFor(() => {
            expect(screen.getByText(/title required/i)).toBeInTheDocument();
        });
    });
});