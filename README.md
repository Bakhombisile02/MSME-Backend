# MSME Platform - Backend API

Backend API for the Eswatini MSME (Micro, Small, and Medium Enterprises) Platform.

## Features

- RESTful API for MSME business management
- User authentication and authorization
- Email notifications (registration, password reset, etc.)
- Admin error monitoring and email alerts
- Business categories and service providers management
- Blog and content management
- File upload handling
- Database with MySQL/Sequelize ORM

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL
- **ORM:** Sequelize
- **Email:** Nodemailer
- **Authentication:** JWT

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd MSME-Backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Set up the database:
```bash
# Create MySQL database
mysql -u root -p
CREATE DATABASE msme_db;
```

5. Start the server:
```bash
# Development
npm start

# Production
NODE_ENV=production npm start
```

## Environment Variables

See `.env.example` for all required environment variables.

### Key Variables:

- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` - Database configuration
- `MAIL_AUTH_USER`, `MAIL_AUTH_PW` - Email SMTP credentials
- `ADMIN_ERROR_EMAILS` - Comma-separated list of admin emails for error notifications
- `PORT` - Server port (default: 3001)

## API Endpoints

### Authentication
- `POST /api/admin/login` - Admin login
- `POST /api/admin/register` - Admin registration

### Business Management
- `GET /api/business-category/list` - List business categories
- `POST /api/business-category/add` - Add business category (admin)
- `GET /api/msme-business/list` - List MSME businesses

### Content
- `GET /api/blog/list` - List blog posts
- `GET /api/faq/list` - List FAQs
- `GET /api/team/list` - List team members

### System
- `GET /api/home-banner/list` - List home page banners
- `GET /api/partners-logo/list` - List partner logos

See individual route files in `/routers` for complete API documentation.

## Project Structure

```
MSME-Backend/
├── app.js                  # Express app configuration
├── server.js               # Server entry point
├── config/                 # Configuration files
│   └── config.js          # Database and app config
├── controllers/           # Request handlers
├── routers/              # API routes
├── models/               # Sequelize models
├── services/             # Business logic
│   ├── BaseRepository.js        # Base CRUD operations
│   └── errorNotificationService.js  # Error email alerts
├── middelware/           # Express middleware
│   ├── auth.middelware.js       # Authentication
│   └── errorHandler.middelware.js  # Global error handling
├── mailer/               # Email templates and sender
├── public/               # Static files and uploads
└── migrations/           # Database migrations

```

## Error Monitoring

The backend includes automatic error monitoring that sends email notifications to administrators when critical errors occur.

### Features:
- Catches all unhandled errors (500 errors, database failures, etc.)
- Sends detailed error emails with stack traces
- Rate limiting to prevent email spam (15 minutes by default)
- Automatic redaction of sensitive data (passwords, tokens)

### Configuration:
```bash
ADMIN_ERROR_EMAILS=admin1@example.com,admin2@example.com
ERROR_NOTIFICATION_RATE_LIMIT_MINUTES=15
```

See `ERROR_NOTIFICATION_GUIDE.md` for details.

## Email Configuration

### Gmail Setup (Development):
1. Enable 2-Step Verification on your Gmail account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Update `.env` with your Gmail credentials

### Production:
For production, consider using:
- SendGrid (recommended)
- AWS SES
- Mailgun

Gmail has a limit of 500 emails/day. See `GMAIL_LIMIT_INFO.md` for details.

## Development

```bash
# Start development server
npm start

# The server will restart on file changes if using nodemon
```

## Deployment

1. Set `NODE_ENV=production` in your environment
2. Update database credentials
3. Configure production email service
4. Use process manager (PM2, systemd)

### Example with PM2:
```bash
npm install -g pm2
pm2 start server.js --name msme-backend
pm2 save
pm2 startup
```

## Security

- Never commit `.env` file to version control
- Use strong passwords for database and email
- Keep dependencies updated (`npm audit`)
- Use HTTPS in production
- Implement rate limiting for public endpoints
- Sanitize user inputs

## Database

The application uses Sequelize ORM. Database tables are created automatically on first run.

### Manual Migration:
```bash
# If you need to run migrations manually
npx sequelize-cli db:migrate
```

## Troubleshooting

### Database Connection Errors:
- Check MySQL is running: `systemctl status mysql`
- Verify credentials in `.env`
- Ensure database exists: `SHOW DATABASES;`

### Email Not Sending:
- Check Gmail app password is correct
- Verify 2-Step Verification is enabled
- Check for daily sending limits (500/day for Gmail)

### Port Already in Use:
```bash
# Find process using port 3001
lsof -i :3001
# Kill the process
kill -9 <PID>
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

[Your License Here]

## Support

For issues and questions:
- Email: mis@datamatics.co.sz
- Create an issue in this repository

## Documentation

- `ERROR_NOTIFICATION_GUIDE.md` - Error monitoring system documentation
- `EMAIL_ACCOUNTS_SUMMARY.md` - Email configuration details
- `QUICK_REFERENCE.txt` - Quick commands and settings
