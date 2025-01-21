import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Game from './Game';

// Mock the words array
jest.mock('../data/words', () => ({
  words: ['ring', 'test', 'word'],
}));

describe('Game Component', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  // Initial render tests
  test('renders start button initially', () => {
    render(<Game />);
    expect(screen.getByText('START')).toBeInTheDocument();
  });

  // Game start tests
  test('initializes game state correctly when starting', () => {
    render(<Game />);
    const startButton = screen.getByText('START');
    fireEvent.click(startButton);

    expect(screen.getByTestId('score')).toHaveTextContent('0');
    expect(screen.getByTestId('category')).toBeDefined();
    expect(screen.getByTestId('time')).toHaveTextContent('60');
    const heartIcons = screen.getAllByTestId('heart-icon');
    expect(heartIcons).toHaveLength(5);
    const letters = screen.queryByTestId('letter');
    expect(letters).toBeInTheDocument();
    expect(screen.getByText('END')).toBeInTheDocument();
  });

  // game end test
  test('end game when pressed', () => {
    render(<Game />);
    const startButton = screen.getByText('START');
    fireEvent.click(startButton);
    const endButton = screen.getByText('END');
    fireEvent.click(endButton);
  });
});
