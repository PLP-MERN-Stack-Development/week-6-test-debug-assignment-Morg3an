const logger = {
  log: (...args) => console.log('[LOG]:', ...args),
  error: (...args) => console.error('[ERROR]:', ...args),
  warn: (...args) => console.warn('[WARN]:', ...args),
};

export default logger;

// Usage:
// import logger from '../utils/logger';
// logger.log('App loaded');