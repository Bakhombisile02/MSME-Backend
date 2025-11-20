const nodemailer = require('nodemailer');

// Admin emails to notify on errors - configurable via environment variable
const ADMIN_EMAILS = process.env.ADMIN_ERROR_EMAILS 
    ? process.env.ADMIN_ERROR_EMAILS.split(',').map(email => email.trim())
    : ['siyamukeladlamini1@icloud.com', 'mis@datamatics.co.sz'];

// Rate limiting to prevent email spam
const errorCache = new Map();
const RATE_LIMIT_MINUTES = parseInt(process.env.ERROR_NOTIFICATION_RATE_LIMIT_MINUTES) || 15;

// Use separate admin email account for error notifications
const ADMIN_MAIL_CONFIG = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.ADMIN_MAIL_AUTH_USER || 'siyamukeladlamini1@gmail.com',
        pass: process.env.ADMIN_MAIL_AUTH_PW || ''
    }
};

console.log(`Error notifications will be sent FROM: ${ADMIN_MAIL_CONFIG.auth.user}`);
console.log(`Error notifications will be sent TO: ${ADMIN_EMAILS.join(', ')}`);
console.log(`Rate limit: ${RATE_LIMIT_MINUTES} minutes`);

/**
 * Send error notification email to administrators
 */
async function sendErrorNotification(errorDetails) {
    try {
        const {
            error,
            endpoint,
            method,
            userId,
            timestamp,
            serverInfo
        } = errorDetails;

        // Create a unique key for this error type
        const errorKey = `${endpoint}-${error.message}`;
        
        // Check if we've recently sent this error
        if (errorCache.has(errorKey)) {
            const lastSent = errorCache.get(errorKey);
            const minutesSinceLastSent = (Date.now() - lastSent) / 1000 / 60;
            
            if (minutesSinceLastSent < RATE_LIMIT_MINUTES) {
                console.log(`Skipping duplicate error notification for: ${errorKey} (sent ${Math.round(minutesSinceLastSent)} minutes ago)`);
                return;
            }
        }

        // Update cache
        errorCache.set(errorKey, Date.now());

        // Create email content
        const subject = `🚨 MSME Application Error Alert - ${endpoint}`;
        const htmlContent = generateErrorEmailTemplate(errorDetails);

        // Send email using ADMIN email account
        const transporter = nodemailer.createTransport(ADMIN_MAIL_CONFIG);
        
        const message = {
            from: `MSME Admin Alerts <${ADMIN_MAIL_CONFIG.auth.user}>`,
            to: ADMIN_EMAILS.join(','),
            subject: subject,
            html: htmlContent
        };

        await transporter.sendMail(message);
        console.log(`✓ Error notification sent to: ${ADMIN_EMAILS.join(', ')}`);
        
    } catch (emailError) {
        // Don't throw errors from error notification service
        // Just log them to prevent cascading failures
        console.error('✗ Failed to send error notification email:', emailError.message);
    }
}

/**
 * Generate HTML email template for error notifications
 */
function generateErrorEmailTemplate(errorDetails) {
    const {
        error,
        endpoint,
        method,
        userId,
        timestamp,
        requestBody,
        queryParams,
        headers,
        stackTrace
    } = errorDetails;

    return `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { background: #dc3545; color: white; padding: 20px; border-radius: 5px; }
        .content { background: #f8f9fa; padding: 20px; margin-top: 20px; border-radius: 5px; }
        .error-box { background: #fff; border-left: 4px solid #dc3545; padding: 15px; margin: 15px 0; }
        .info-box { background: #fff; border-left: 4px solid #007bff; padding: 15px; margin: 15px 0; }
        .code { background: #272822; color: #f8f8f2; padding: 15px; border-radius: 5px; overflow-x: auto; font-family: monospace; font-size: 12px; }
        .label { font-weight: bold; color: #495057; }
        .value { color: #212529; }
        table { width: 100%; border-collapse: collapse; margin: 10px 0; }
        table td { padding: 8px; border-bottom: 1px solid #dee2e6; }
        table td:first-child { font-weight: bold; width: 150px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚨 Application Error Alert</h1>
            <p>MSME Platform - Production Environment</p>
        </div>
        
        <div class="content">
            <h2>Error Summary</h2>
            <div class="error-box">
                <table>
                    <tr>
                        <td>Timestamp:</td>
                        <td>${new Date(timestamp).toLocaleString('en-US', { timeZone: 'Africa/Mbabane' })} (SAST)</td>
                    </tr>
                    <tr>
                        <td>Error Message:</td>
                        <td><strong style="color: #dc3545;">${escapeHtml(error.message)}</strong></td>
                    </tr>
                    <tr>
                        <td>Endpoint:</td>
                        <td><code>${method} ${endpoint}</code></td>
                    </tr>
                    ${userId ? `<tr><td>User ID:</td><td>${userId}</td></tr>` : ''}
                    <tr>
                        <td>Error Type:</td>
                        <td>${error.name || 'Unknown'}</td>
                    </tr>
                </table>
            </div>

            ${stackTrace ? `
            <h2>Stack Trace</h2>
            <div class="code">
${escapeHtml(stackTrace)}
            </div>
            ` : ''}

            ${queryParams && Object.keys(queryParams).length > 0 ? `
            <h2>Query Parameters</h2>
            <div class="info-box">
                <pre>${JSON.stringify(queryParams, null, 2)}</pre>
            </div>
            ` : ''}

            ${requestBody && Object.keys(requestBody).length > 0 ? `
            <h2>Request Body</h2>
            <div class="info-box">
                <pre>${JSON.stringify(sanitizeRequestBody(requestBody), null, 2)}</pre>
            </div>
            ` : ''}

            <h2>Recommended Actions</h2>
            <div class="info-box">
                <ul>
                    <li>Check the application logs for more details</li>
                    <li>Verify database connectivity and credentials</li>
                    <li>Review recent deployments or configuration changes</li>
                    <li>Monitor error frequency - multiple errors may indicate a systemic issue</li>
                </ul>
            </div>

            <hr style="margin: 30px 0; border: none; border-top: 1px solid #dee2e6;">
            <p style="color: #6c757d; font-size: 12px;">
                This is an automated notification from the MSME Platform error monitoring system.
                <br>To update notification preferences, edit ADMIN_ERROR_EMAILS in the .env file.
            </p>
        </div>
    </div>
</body>
</html>
    `;
}

/**
 * Escape HTML to prevent XSS in emails
 */
function escapeHtml(text) {
    if (!text) return '';
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/**
 * Remove sensitive data from request body before logging
 */
function sanitizeRequestBody(body) {
    const sensitiveFields = ['password', 'token', 'secret', 'apiKey', 'api_key', 'authorization'];
    const sanitized = { ...body };
    
    for (const field of sensitiveFields) {
        if (sanitized[field]) {
            sanitized[field] = '[REDACTED]';
        }
    }
    
    return sanitized;
}

/**
 * Send critical system error (database down, etc)
 */
async function sendCriticalSystemError(errorType, errorMessage, details = {}) {
    const errorDetails = {
        error: { message: errorMessage, name: errorType },
        endpoint: 'SYSTEM',
        method: 'CRITICAL',
        timestamp: Date.now(),
        stackTrace: details.stack || '',
        serverInfo: details
    };
    
    await sendErrorNotification(errorDetails);
}

module.exports = {
    sendErrorNotification,
    sendCriticalSystemError
};
