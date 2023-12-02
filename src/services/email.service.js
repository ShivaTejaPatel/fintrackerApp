
const nodemailer = require('nodemailer');


exports.sendAlertNotification = async (recipient, currency_from, currency_to, desiredRate) => {
  try {
    const transporter = nodemailer.createTransport({
      
      service: 'Gmail',
      auth: {
        user: 'b181332@rgukt.ac.in',
        pass: 'B181332@12',
      },
    });

    // Create email content
    const mailOptions = {
      from: 'b181332@rgukt.ac.in',
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
