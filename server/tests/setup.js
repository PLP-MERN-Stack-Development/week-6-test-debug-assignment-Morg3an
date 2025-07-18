// Optional: add any global setup here (e.g., environment variables or mocks)
jest.setTimeout(10000); // ensure enough time for DB ops

// If using dotenv:
require('dotenv').config({ path: '.env.test' });