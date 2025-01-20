import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Game from './Game';

test('renders start button initially', () => {
  render(<Game />);
  expect(screen.getByText('START')).toBeInTheDocument();
});
