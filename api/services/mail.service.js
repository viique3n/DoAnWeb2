const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

module.exports.send = async (to, subject, content) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  return transporter.sendMail({
    from: process.env.EMAIL_USERNAME,
    to,
    subject,
    text: content,
  });
};
