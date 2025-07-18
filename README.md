# 🧪 Testing Strategy

## Tools Used
- **Jest**: Unit & integration testing
- **React Testing Library (RTL)**: Client component testing
- **Supertest**: API integration testing
- **Cypress**: End-to-end testing
- **MSW**: Mock Service Worker for API mocking
- **Winston**: Server-side logging
- **React ErrorBoundary**: Client-side error handling

## Types of Testing
- ✅ Unit Tests (utils, middleware, components)
- ✅ Integration Tests (API endpoints, form submissions)
- ✅ E2E Tests (Cypress – login, register, post CRUD, navigation)

## How to Run Tests

### Run all tests with coverage:
```bash
npm test -- --coverage