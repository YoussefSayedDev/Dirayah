import '@testing-library/jest-dom';
import { server } from './src/mocks/server';

beforeAll(() => {
  // Enable API mocking before tests.
  server.listen();
});

afterEach(() => {
  // Reset request handlers after each test
  server.resetHandlers();
});

afterAll(() => {
  // Clean up after all tests are done
  server.close();
});