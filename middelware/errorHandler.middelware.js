const { sendErrorNotification } = require('../services/errorNotificationService');

/**
 * Global error handling middleware
 * Catches all unhandled errors and sends email notifications
 */
function errorHandler(err, req, res, next) {
    // Log the error
    console.error('ERROR:', err);

    // Prepare error details for notification
    const errorDetails = {
        error: {
            message: err.message || 'Unknown error',
            name: err.name || 'Error'
        },
        endpoint: req.originalUrl || req.url,
        method: req.method,
        userId: req.user?.id || req.userId || null,
        timestamp: Date.now(),
        requestBody: req.body,
        queryParams: req.query,
        stackTrace: err.stack
    };

    // Send error notification email (async, don't wait)
    sendErrorNotification(errorDetails).catch(emailErr => {
        console.error('Failed to send error notification:', emailErr.message);
    });

    // Determine status code
    const statusCode = err.statusCode || err.status || 500;

    // Send response to client
    res.status(statusCode).json({
        error: process.env.NODE_ENV === 'production' 
            ? 'Internal server error' 
            : err.message,
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
    });
}

/**
 * Async error wrapper to catch errors in async route handlers
 */
function asyncHandler(fn) {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}

module.exports = {
    errorHandler,
    asyncHandler
};
