// Import TextEncoder and TextDecoder from Node.js util module
import { TextDecoder, TextEncoder } from 'util';

// Add TextEncoder and TextDecoder to the global object
globalThis.TextEncoder = TextEncoder;
globalThis.TextDecoder = TextDecoder;

const nextJest = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',  // Fixed path mapping pattern
  },
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest', {
      jsc: {
        parser: {
          syntax: 'typescript',
          tsx: true,
        },
        transform: {
          react: {
            runtime: 'automatic',
          },
        },
      },
    }],
  },
  transformIgnorePatterns: [
    '/node_modules/(?!msw).+\\.js$'
  ],
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  // Set polyfills to run before tests
  setupFiles: ['<rootDir>/jest.node-globals.js'],
};

export default nextJest;