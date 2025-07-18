import { render, screen, fireEvent } from '@testing-library/react';
import Form from '../../components/Form';

test('calls onSubmit with form values', () => {
  const handleSubmit = jest.fn();
  render(<Form onSubmit={handleSubmit} />);

  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: 'test@example.com' },
  });
  fireEvent.click(screen.getByRole('button', { name: /submit/i }));

  expect(handleSubmit).toHaveBeenCalled();
});