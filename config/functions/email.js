// /config/functions/email.js

const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  },
});

// Send email function
async function sendEmail(to, subject, text, attachments = []) {
  const mailOptions = {
    from: `"Ad-Nouveau" <${process.env.GMAIL_USER}>`, // Sender address
    to: to,  // List of recipients
    subject: subject,  // Subject line
    text: text,  // Plain text body
    attachments: attachments
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error occurred while sending email:', error);
  }
}

module.exports = sendEmail;
