function errorHandler(err, req, res, next) {
    const logger = require('../utils/logger');
    logger.error(err.stack);

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
}

module.exports = errorHandler;