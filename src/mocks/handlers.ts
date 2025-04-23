import { http, HttpResponse } from 'msw';

export const handlers = [
  // Add your API mock handlers here
  http.get('/api/test', () => {
    return HttpResponse.json({
      message: 'API mocking is working!',
    });
  }),
];