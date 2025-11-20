# Error Notification System Documentation

## Overview
The MSME application now includes an automated error notification system that sends detailed email alerts to administrators whenever critical errors occur.

## Features

### 1. **Automatic Error Detection**
- Catches all unhandled errors in API endpoints
- Monitors uncaught exceptions and unhandled promise rejections
- Triggers on database connection failures and system errors

### 2. **Smart Rate Limiting**
- Prevents email spam by rate-limiting duplicate errors
- Default: Same error type won't be sent more than once every 15 minutes
- Configurable via environment variable

### 3. **Detailed Error Reports**
Email notifications include:
- Error message and type
- Timestamp (in SAST timezone)
- Affected endpoint and HTTP method
- User ID (if authenticated)
- Stack trace for debugging
- Request parameters (query & body)
- Recommended troubleshooting actions

### 4. **Security Features**
- Automatically redacts sensitive fields (passwords, tokens, secrets)
- HTML sanitization to prevent XSS attacks
- Configurable recipient list

## Configuration

### Environment Variables

Add these to your `.env` file:

```bash
# Error notification emails (comma-separated)
ADMIN_ERROR_EMAILS=siyamukeladlamini1@gmail.com,mis@datamatics.co.sz

# Rate limit in minutes (default: 15)
ERROR_NOTIFICATION_RATE_LIMIT_MINUTES=15
```

### Email Configuration
Uses the existing email configuration:
```bash
MAIL_HOST=gmail
MAIL_PORT=465
MAIL_SECURE=true
MAIL_AUTH_USER=undpmsme2025@gmail.com
MAIL_AUTH_PW=pkglxvskxeayuasm
```

## How It Works

### 1. Error Detection Flow

```
API Request → Error Occurs → Error Handler Middleware → Send Email → Log Error
```

### 2. Types of Errors Monitored

**API Errors:**
- Database connection failures
- Query execution errors
- Validation errors
- Authentication/authorization failures
- Any 500-level errors

**System Errors:**
- Uncaught exceptions
- Unhandled promise rejections
- Critical system failures

### 3. Rate Limiting Logic

```javascript
// Example: If same error occurs multiple times
First occurrence  → Email sent ✓
After 5 minutes   → Email skipped (rate limit)
After 10 minutes  → Email skipped (rate limit)
After 16 minutes  → Email sent ✓ (rate limit expired)
```

## Email Template

Administrators receive a professionally formatted HTML email containing:

```
🚨 Application Error Alert

Error Summary:
- Timestamp: [Date/Time in SAST]
- Error: [Error message]
- Endpoint: GET/POST /api/endpoint
- Error Type: SequelizeConnectionError

Stack Trace:
[Full stack trace for debugging]

Query Parameters:
{ "page": 1, "limit": 10 }

Recommended Actions:
- Check application logs
- Verify database connectivity
- Review recent changes
```

## Testing

### Manual Test
To test the error notification system:

```bash
cd /root/MSME\ Full\ Code\ Backup/MSME-Backend
node test-error-notification.js
```

### Trigger Real Error (for testing)
```bash
# Temporarily break database connection to test
# Stop MySQL
sudo systemctl stop mysql

# Make API request (will fail and send email)
curl http://localhost:3001/api/home-banner/list

# Restart MySQL
sudo systemctl start mysql
```

## Monitoring

### Check if notifications are working:

```bash
# View server logs
tail -f backend.log | grep "Error notification"

# Successful notification:
✓ Error notification sent to: siyamukeladlamini1@gmail.com, mis@datamatics.co.sz

# Rate-limited (skipped):
Skipping duplicate error notification for: /api/endpoint-Error message (sent 5 minutes ago)

# Failed to send:
✗ Failed to send error notification email: Connection timeout
```

## Troubleshooting

### Not Receiving Emails?

1. **Check Email Configuration**
   ```bash
   cat .env | grep MAIL_
   ```

2. **Verify Admin Emails**
   ```bash
   cat .env | grep ADMIN_ERROR_EMAILS
   ```

3. **Check Gmail Sending Limits**
   - Gmail has daily sending limits
   - If exceeded, emails will fail with "Daily user sending limit exceeded"
   - Consider using a dedicated SMTP service for production

4. **Check Server Logs**
   ```bash
   grep "Error notification" backend.log
   ```

### Common Issues

**Gmail Rate Limit Exceeded:**
```
Failed to send error notification email: Daily user sending limit exceeded
```
**Solution:** Wait 24 hours or configure a different SMTP provider

**Invalid Email Format:**
```
Failed to send error notification email: Invalid recipients
```
**Solution:** Check ADMIN_ERROR_EMAILS format in .env

**SMTP Connection Failed:**
```
Failed to send error notification email: Connection timeout
```
**Solution:** Verify MAIL_HOST, MAIL_PORT, and credentials

## Adding More Recipients

Edit `.env`:
```bash
# Add more emails (comma-separated)
ADMIN_ERROR_EMAILS=admin1@example.com,admin2@example.com,admin3@example.com
```

Then restart the server:
```bash
npm restart
```

## Customization

### Change Rate Limit

To receive more frequent notifications:
```bash
# .env
ERROR_NOTIFICATION_RATE_LIMIT_MINUTES=5  # Email every 5 minutes instead of 15
```

### Modify Email Template

Edit: `services/errorNotificationService.js`
- Function: `generateErrorEmailTemplate()`

### Add Custom Error Types

```javascript
// In your controller
const { sendErrorNotification } = require('../services/errorNotificationService');

try {
    // Your code
} catch (error) {
    // Custom error notification
    await sendErrorNotification({
        error: { message: error.message, name: 'CustomError' },
        endpoint: req.originalUrl,
        method: req.method,
        timestamp: Date.now(),
        customField: 'custom value'
    });
}
```

## Production Considerations

1. **Use Dedicated SMTP Service**
   - Gmail has sending limits
   - Consider: SendGrid, AWS SES, Mailgun, etc.

2. **Monitor Email Delivery**
   - Check bounce rates
   - Verify emails aren't marked as spam

3. **Log Rotation**
   - Ensure backend.log doesn't grow too large
   - Implement log rotation with logrotate

4. **Alerting Escalation**
   - For critical errors, consider SMS/Slack notifications
   - Integrate with monitoring tools (PagerDuty, etc.)

## Files Modified/Created

```
services/errorNotificationService.js    - Email notification service (NEW)
middelware/errorHandler.middelware.js   - Global error handler (NEW)
app.js                                   - Added error handler middleware (MODIFIED)
.env                                     - Added email configuration (MODIFIED)
test-error-notification.js              - Test script (NEW)
ERROR_NOTIFICATION_GUIDE.md             - This documentation (NEW)
```

## Support

For issues or questions:
- Email: siyamukeladlamini1@gmail.com
- Email: mis@datamatics.co.sz

---

**Last Updated:** November 20, 2025
**Version:** 1.0.0
