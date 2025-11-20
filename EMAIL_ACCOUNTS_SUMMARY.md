# ✅ Email Accounts Configuration - Confirmed

## Two Separate Email Accounts

### 1. Normal Application Emails
**Account:** `undpmsme2025@gmail.com`  
**Used for:**
- User registration confirmations
- Password reset requests (OTP)
- Account approval/rejection notifications
- General application emails

**Configuration (.env):**
```env
MAIL_AUTH_USER=undpmsme2025@gmail.com
MAIL_AUTH_PW=pkglxvskxeayuasm
MAIL_FROM_STRING="Eswatini MSME Platform <undpmsme2025@gmail.com>"
```

---

### 2. Admin Error Notifications
**Account:** `siyamukeladlamini1@gmail.com`  
**Used for:**
- Backend error alerts (500 errors)
- Database connection failures
- Uncaught exceptions
- System critical errors

**Sends to:**
- siyamukeladlamini1@icloud.com
- mis@datamatics.co.sz

**Configuration (.env):**
```env
ADMIN_MAIL_AUTH_USER=siyamukeladlamini1@gmail.com
ADMIN_MAIL_AUTH_PW=zovqobpIjzitwawni7
ADMIN_ERROR_EMAILS=siyamukeladlamini1@icloud.com,mis@datamatics.co.sz
```

---

## Verification

### Server logs confirm:
```
Error notifications will be sent FROM: siyamukeladlamini1@gmail.com
Error notifications will be sent TO: siyamukeladlamini1@icloud.com, mis@datamatics.co.sz
```

### Test Each Account

**Test normal app emails:**
1. Register a new user on the website
2. Request a password reset
3. Check email at the user's provided address

**Test admin error emails:**
```bash
cd /root/MSME\ Full\ Code\ Backup/MSME-Backend
node test-error-notification.js
```
Check emails at:
- siyamukeladlamini1@icloud.com ✓
- mis@datamatics.co.sz ✓

---

## Quick Reference

| Purpose | From Account | To Address(es) |
|---------|-------------|----------------|
| User Registration | undpmsme2025@gmail.com | User's email |
| Password Reset | undpmsme2025@gmail.com | User's email |
| Account Approval | undpmsme2025@gmail.com | User's email |
| Error Alerts | siyamukeladlamini1@gmail.com | siyamukeladlamini1@icloud.com, mis@datamatics.co.sz |
| System Errors | siyamukeladlamini1@gmail.com | siyamukeladlamini1@icloud.com, mis@datamatics.co.sz |

---

## Files Managing Email Accounts

**Normal App Emails:**
- `mailer/mailerFile.js` - Uses CONFIG.mail (undpmsme2025@gmail.com)
- All controllers that send user emails

**Admin Error Emails:**
- `services/errorNotificationService.js` - Uses ADMIN_MAIL_CONFIG (siyamukeladlamini1@gmail.com)
- `middelware/errorHandler.middelware.js` - Triggers error notifications

---

## Configuration Files

### .env file structure:
```env
# Normal application emails (user-facing)
MAIL_HOST=gmail
MAIL_PORT=465
MAIL_SECURE=true
MAIL_AUTH_USER=undpmsme2025@gmail.com
MAIL_AUTH_PW=pkglxvskxeayuasm
MAIL_FROM_STRING="Eswatini MSME Platform <undpmsme2025@gmail.com>"

# Admin error notification emails (system-facing)
ADMIN_MAIL_AUTH_USER=siyamukeladlamini1@gmail.com
ADMIN_MAIL_AUTH_PW=zovqobpIjzitwawni7
ADMIN_ERROR_EMAILS=siyamukeladlamini1@icloud.com,mis@datamatics.co.sz
ERROR_NOTIFICATION_RATE_LIMIT_MINUTES=15
```

---

## Security Notes

✅ Two separate Gmail accounts for different purposes  
✅ App passwords used (not regular passwords)  
✅ Sensitive data redacted in error notifications  
✅ Rate limiting prevents email spam

---

**Status:** ✅ Correctly Configured  
**Last Verified:** November 20, 2025, 07:08 UTC  
**Server Status:** Running
