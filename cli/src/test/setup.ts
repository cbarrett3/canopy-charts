import { TextEncoder, TextDecoder } from 'util';
import { vol } from 'memfs';
import { jest, beforeEach } from '@jest/globals';

// Mock TextEncoder/Decoder for Node.js environment
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;

// Mock the file system
jest.mock('fs', () => require('memfs'));
jest.mock('fs/promises', () => require('memfs').promises);

// Reset the file system before each test
beforeEach(() => {
  vol.reset();
});

// Mock console to prevent noise during tests
global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
};
