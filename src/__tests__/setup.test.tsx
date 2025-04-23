import { render, screen } from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import { server } from '../mocks/server';

// Sample component for testing
function TestComponent() {
  return <div>Testing is working!</div>;
}

describe('Testing Setup Verification', () => {
  // Test React component rendering
  it('renders component correctly', () => {
    render(<TestComponent />);
    expect(screen.getByText('Testing is working!')).toBeInTheDocument();
  });

  // Test custom matcher from jest-dom
  it('verifies jest-dom custom matchers', () => {
    render(<button disabled>Disabled Button</button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  // Test MSW API mocking
  it('mocks API calls correctly', async () => {
    // Setup mock
    server.use(
      http.get('/api/test-setup', () => {
        return HttpResponse.json({ message: 'MSW is working!' });
      })
    );

    // Make API call
    const response = await fetch('/api/test-setup');
    const data = await response.json();

    expect(data.message).toBe('MSW is working!');
  });
});