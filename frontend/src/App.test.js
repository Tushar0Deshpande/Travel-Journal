import { render, screen } from '@testing-library/react';
import App from './App';
import { ContextProvider } from './context/Context';

test('renders TravelJournal application navbar header', () => {
  render(
    <ContextProvider>
      <App />
    </ContextProvider>
  );
  const logoElement = screen.getByText(/TravelJournal/i);
  expect(logoElement).toBeInTheDocument();
});

