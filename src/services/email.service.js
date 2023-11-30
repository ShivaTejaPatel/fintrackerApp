
const nodemailer = require('nodemailer');

// Function to send email notifications for triggered alerts
exports.sendAlertNotification = async (recipient, currency_from, currency_to, desiredRate) => {
  try {
    // Configure nodemailer for sending email notifications
    const transporter = nodemailer.createTransport({
      // Specify your email sending configuration (SMTP, service, etc.)
      // Example (using Gmail):
      service: 'Gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-password',
      },
    });

    // Create email content
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: recipient,
      subject: 'Alert Notification: Desired Rate Reached',
      text: `Your desired rate of ${desiredRate} for ${currency_from}-${currency_to} has been reached.`,
    };

    // Send email
    const result = await transporter.sendMail(mailOptions);

    console.log('Email notification sent:', result.response);
    return { success: 'Email notification sent' };
  } catch (error) {
    console.error('Error sending email notification:', error.message);
    return { error: 'Failed to send email notification' };
  }
};
