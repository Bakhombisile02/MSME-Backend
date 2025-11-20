const nodemailer = require('nodemailer');
const emailTemplate = require('./emailTemplate')
const CONFIG = require("../config/config");

// Email id :- undpmsme2025@gmail.com
// Password :- Saurabh@123

let subject;
let output;

async function sendEmail(payload, status, email) {

    console.log("payload", payload);

    if (status == 1) {
        subject = `Registration Request Received by Eswatini MSME Platform`
        output = emailTemplate.ragistrationEmail(payload);
    }
    if (status == 2) {
        subject = `Registration Request Approved by Eswatini MSME Administrator`
        output = emailTemplate.userApprovedEmailTemplate(payload);
    }
    if (status == 3) {
        subject = `Registration Request Update`
        output = emailTemplate.userRejectedEmailTemplate(payload);
    }

    if (status == 4) {
        subject = `OTP for Password Reset`
        output = emailTemplate.passwordResetOTPSend(payload);
    }


    try {
        let transporter = nodemailer.createTransport(CONFIG.mail)

        message = {
            from: CONFIG.mail_from,
            to: email,
            subject: subject,
            html: output
        }

        transporter.sendMail(message, function (error, info) {
            if (error) {
                console.log(error);
                return 0;
            } else {
                console.log('Email sent: ' + info.response);
                console.log('From:', message.from, '| To:', message.to);
                return 1;
            }
        });
    }
    catch (error) {
        console.error('Error sending email:', error);
        return 0;
    }
}

module.exports = sendEmail;