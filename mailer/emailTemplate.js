const RTRRejectedEmailTemplate = (payload) =>
    `<html>
<head>
    <title></title>
</head>
<body>
    <!-- Take only this part for email -->
   
    <b>Dear User,</b> <br>

    <p>We regret to inform you that your plastic return, filed for this month has been rejected
    by EEA.<p>
    Comments, if any, by EEA:<br> 
    ${payload.admin_comments}
    <p> We request you to log into the plastic return filing system and revise your return for
    this month.</p>
    <b> Regards, </b> <br>
    EEA System Admin
    <br><br>
    <b> Eswatini Environment Authority </b><br>
    RHUS Office Park<br>
    Karl Grant Street<br>
    Mbabane<br>
    Eswatini<br>
    Email: systems@eea.org.sz <br>
    Tell: +268 2404 6960/7893 <br>
    Cell: +268 7854 6907 or 7806 1658 <br>
    <br><br><br>
    <p style="color:red;"> *This is a system generated message, please do not reply to this email.</p>
    </body>
    </html>`




const RTRApprovedEmailTemplate = (payload) =>
    `<html>
<head>
    <title></title>
</head>
<body>
    <!-- Take only this part for email -->
   
    <b>Dear User,</b> <br>

    <p>We are pleased to inform you that your plastic return filed for this month has been approved by EEA.<p>
    Comments, if any, by EEA:<br> 
    ${payload.admin_comments}
    <p> We thank you for your support.</p>
    <b> Regards, </b> <br>
    EEA System Admin
    <br><br>
    <b> Eswatini Environment Authority </b><br>
    RHUS Office Park<br>
    Karl Grant Street<br>
    Mbabane<br>
    Eswatini<br>
    Email: systems@eea.org.sz <br>
    Tell: +268 2404 6960/7893 <br>
    Cell: +268 7854 6907 or 7806 1658 <br>
    <br><br><br>
    <p style="color:red;"> *This is a system generated message, please do not reply to this email.</p>
    </body>
    </html>`


// Ragistration Email Hospital
const ragistrationEmail = (payload) =>
    `<html>
<head>
    <title></title>
</head>
<body>
    <!-- Take only this part for email -->
   
    <b>Dear User,</b> <br>
    <p>Thank you for submitting your registration request. We have received your information and will review the details provided.</p> 
    <p>Our team will carefully evaluate your submission and proceed with the approval process. If any additional details are required, we will reach out to you.</p>
    <p>You will receive an update on the status of your registration soon. In the meantime, please feel free to contact us if you have any questions.</p>
    <br><br><br>

    <b> Regards, </b> <br>
    Eswatini MSME Platform Admin
    <br><br>
    <b> Eswatini MSME Platform Admin </b><br>
    Email: To be added later<br>
    Tell: +268 2403 201/6<br>
    Fax: +268 2404 4711/+268 2404 2959<br>
    Cell: To be added later<br>
    <br><br><br>
    <p style="color:red;"> *This is a system generated message, please do not reply to this email.</p>
    </body>
    </html>`


// Ragistration Email Nurse
const ragistrationEmailNurse = (payload) =>
`<html>
<head>
<title></title>
</head>
<body>
<!-- Take only this part for email -->

<b>Dear ${payload.nurses_first_name},</b> <br>
<p>We are pleased to inform you that you have successfully registered with the EDEFS Image Management and Reporting portal as a nurse.</p> 
<p> Please use the following credentials to logIn into the system.</p>
Email ID - ${payload.nurses_email_id}<br>
Password - ${payload.password}<br><br>
<b> Regards, </b> <br>
Ministry of Health Kingdom of Eswatini
<br><br>
<b> Ministry of Health Kingdom of Eswatini </b><br>
To be added later<br>
Email: To be added later<br>
Tell: To be added later<br>
Cell: To be added later<br>
<br><br><br>
<p style="color:red;"> *This is a system generated message, please do not reply to this email.</p>
</body>
</html>`


// Ragister User Apprvle
const resetPasswordRequest = (payload, email) =>
    `<html>
<head>
    <title></title>
</head>
<body>
    <!-- Take only this part for email -->
   
    <b>Dear User,</b> <br>
    <p>We recives your reset password request click on the below link to reset your password</p> 
    <br>
    <a href="${process.env.APP_URL}resetpassword?token=${payload.token}">Click Hear to Reset Password</a>
    <br> <br>
    <b> Regards, </b> <br> 
    Ministry of Health Kingdom of Eswatini
    <br><br>
    <b> Ministry of Health Kingdom of Eswatini
    </b><br>
    RHUS Office Park<br>
    Karl Grant Street<br>
    Mbabane<br>
    Eswatini<br>
    Email: systems@eea.org.sz <br>
    Tell: +268 2404 6960/7893 <br>
    Cell: +268 7854 6907 or 7806 1658 <br>
    <br><br><br>
    <p style="color:red;"> *This is a system generated message, please do not reply to this email.</p>
    </body>
    </html>`


// Password Sussesfully Reset Email
const passwordResetOTPSend = (payload, email) =>
    `<html>
<head>
    <title></title>
</head>
<body>
    <!-- Take only this part for email -->
   
    <b>Dear User,</b> <br>
    <p>We received a request to reset the password for your account.</p> 
    <p>Your One-Time Password (OTP) is:</p>
    ${payload.otp}
    <p>This OTP is valid for 10 minutes. Please do not share this code with anyone.</p>
    <p>If you did not request this, please ignore this email.</p>

    <br> <br>
    <b> Regards, </b> <br>
    Eswatini MSME Platform Admin
    <br><br>
    <b> Eswatini MSME Platform Admin </b><br>
    Email: To be added later <br>
    Tell: +268 2403 201/6<br>
    Fax: +268 2404 4711/+268 2404 2959<br>
    Cell: To be added later <br>
    <br><br><br>
    <p style="color:red;"> *This is a system generated message, please do not reply to this email.</p>
    </body>
    </html>`


// Ragister User Apprvle
const userApprovedEmailTemplate = (payload, email) =>
    `<html>
<head>
    <title></title>
</head>
<body>
    <!-- Take only this part for email -->
   
    <b>Dear User,</b> <br>
    <p>We are pleased to inform you that your registration request has been reviewed and approved by our system administrator. You MSME listing is now live on our platform. </p> 
    <p>If you have any questions or require further assistance, please feel free to reach out.</p>
    <p>Welcome aboard!</p>
    <br>
    <b> Regards, </b> <br>
    Eswatini MSME Platform Admin
    <br><br>
    <b> Eswatini MSME Platform Admin </b><br>
    Email: To be added later <br>
    Tell: +268 2403 201/6<br>
    Fax: +268 2404 4711/+268 2404 2959<br>
    Cell: To be added later <br>
    <br><br><br>
    <p style="color:red;"> *This is a system generated message, please do not reply to this email.</p>
    </body>
    </html>`



const userRejectedEmailTemplate = (payload, email) =>
    `<html>
<head>
    <title></title>
</head>
<body>
    <!-- Take only this part for email -->
   
    <b>Dear User,</b> <br>
    <p>Thank you for submitting your registration request. After reviewing your application, our system administrator was unable to approve it at this time.</p> 
    <p> Comments by admin: ${payload.is_verified_comments} </p>
    <p>To proceed, the admin will reach out to you shortly to request additional information or clarification. Please keep an eye on your inbox for further communication.</p>
    <p>We appreciate your patience and cooperation. If you have any questions in the meantime, feel free to reach out.</p>
    <br>
    <b> Regards, </b> <br>
    Eswatini MSME Platform Admin
    <br><br>
    <b> Eswatini MSME Platform Admin </b><br>
    Email: To be added later <br>
    Tell: +268 2403 201/6<br>
    Fax: +268 2404 4711/+268 2404 2959<br>
    Cell: To be added later <br>
    <br><br><br>
    <p style="color:red;"> *This is a system generated message, please do not reply to this email.</p>
    </body>
    </html>`



// This is use to send email to the admin at the time of new user ragistration 
const userRagistrationRequestTemplate = (payload) =>
    `<html>
<head>
    <title></title>
</head>
<body>
    <!-- Take only this part for email -->
    <b>Dear EEA Admin,</b> <br>
    <p>A user has submitted a request for registration. Please log into the ‘Plastic Return’ filing system to review this request.</p> 
    <br>
    <b>Note: </b>This is a system generated message, please do not reply to this email.<br>
    </body>
    </html>`



// This is use to send email to the admin at the time of new user RTR fill by user 
const rTRFillByUserTemplate = (payload) =>
`<html>
<head>
<title></title>
</head>
<body>
<!-- Take only this part for email -->
<b>Dear EEA Admin,</b> <br>
<p>A registered business has submitted their monthly plastic return. Please log into the ‘Plastic Return’ filing system to process this return.</p> 
<br>
<b>Note: </b>This is a system generated message, please do not reply to this email.<br>
</body>
</html>`
    


// This is a Manager Email Template.
const managerEmailTemplate = (payload) =>
    `
   <!DOCTYPE html>
   <html>
   
   <head>
       <title></title>
   </head>
   
   <body>
       <!-- Take only this part for email -->    
       <table style="width: 720px; font-family: Arial, Helvetica, sans-serif; ">
           <tr>
               <td colspan="2" style="text-align: center;padding: 12px; border-bottom: 1px solid #ccc;">Leave Application
               </td>
           </tr>
           <tr>
               <td style="width: 50%; vertical-align: top;">
                   <div style=" margin-left: 10px; padding: 10px; ">
                       Employee name
                   </div>
               </td>
               <td style="vertical-align: top;">
                   <div style=" margin-left: 10px; padding: 10px;">
                       ${payload.leave_apply_by_name}
                   </div>
               </td>
           </tr>
           <tr>
               <td style="width: 50%; vertical-align: top;">
                   <div style=" margin-left: 10px; padding: 10px; ">
                   Leave Type
                   </div>
               </td>
               <td style="vertical-align: top;">
                   <div style=" margin-left: 10px; padding: 10px;">
                   ${payload.leave_type}
                   </div>
               </td>
           </tr>
           <tr>
               <td style="width: 50%; vertical-align: top;">
                   <div style=" margin-left: 10px; padding: 10px; ">
                   Date of application
                   </div>
               </td>
               <td style="vertical-align: top;">
                   <div style=" margin-left: 10px; padding: 10px;">
                   ${payload.created_at} 
                   </div>
               </td>
           </tr>
           <tr>
               <td style="width: 50%; vertical-align: top;">
                   <div style=" margin-left: 10px; padding: 10px; ">
                   Leave duration
                   </div>
               </td>
               <td style="vertical-align: top;">
                   <div style=" margin-left: 10px; padding: 10px;">
                   ${payload.start_date} to ${payload.end_date}
                   </div>
               </td>
           </tr>

           <tr>
               <td style="width: 50%; vertical-align: top;">
                   <div style=" margin-left: 10px; padding: 10px; ">
                   Number of working days
                   </div>
               </td>
               <td style="vertical-align: top;">
                   <div style=" margin-left: 10px; padding: 10px;">
                   ${payload.number_of_days}
                   </div>
               </td>
           </tr>

           <tr>
           <td style="width: 50%; vertical-align: top;">
               <div style=" margin-left: 10px; padding: 10px; ">
               Employee Comments
               </div>
           </td>
           <td style="vertical-align: top;">
               <div style=" margin-left: 10px; padding: 10px;">
               ${payload.leave_apply_by_comments}
               </div>
           </td>
          </tr>

           <tr>
               <td>
                   <a href="http://10.0.10.105/report/leave-requests">
                       <button type="button"
                           style="border: 0px; background:lightgreen; width: 100%; height: 40px; text-transform: uppercase;">
                           Approve
                       </button>
                   </a>
               </td>
               <td>
                   <a href="http://10.0.10.105/report/leave-requests">
                       <button type="button"
                           style="border: 0px; background:lightcoral; width: 100%; height: 40px; text-transform: uppercase;">
                           Reject
                       </button>
                   </a>
               </td>
           </tr>
       </table>
   </body>
   
   </html>
   `



module.exports = {
    ragistrationEmail,
    ragistrationEmailNurse,
    resetPasswordRequest,
    passwordResetOTPSend,

    RTRRejectedEmailTemplate,
    RTRApprovedEmailTemplate,
    
    
    userApprovedEmailTemplate,
    userRejectedEmailTemplate,
    userRagistrationRequestTemplate,
    rTRFillByUserTemplate
}