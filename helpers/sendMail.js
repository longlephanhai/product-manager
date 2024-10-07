const nodemailer = require('nodemailer');

const sendMail = (email,subject,otp) => {
  // Create a transporter object
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use Gmail as the email service
    auth: {
      user: process.env.MAIL, // Your Gmail email address
      pass: process.env.PASS_EMAIL // Your Gmail password
    }
  });

  // Define the email options
  const mailOptions = {
    from: process.env.MAIL, // Sender's email address
    to: email, // Recipient's email address
    subject: subject, // Subject line
    html: `Đây là mã ${otp}` // Plain text body
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
module.exports = {sendMail}