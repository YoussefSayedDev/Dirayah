import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

// Define handlers
export const handlers = [
  http.get('/api/test-setup', () => {
    return HttpResponse.json({ message: 'MSW is working!' });
  }),
];

// This configures a request mocking server with the given handlers.
export const server = setupServer(...handlers);