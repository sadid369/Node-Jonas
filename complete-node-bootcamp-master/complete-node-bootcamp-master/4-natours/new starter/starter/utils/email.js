const nodemailer = require('nodemailer');
const app = require('./../app');
const senEmail = async (options) => {
  // 1) Create a transporter

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL__USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log(success);
    }
  });
  //   2) Define the email options
  const mailOptions = {
    from: 'Sadid Jones <sadid.jones@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.text,
  };
  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = senEmail;
