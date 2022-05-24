import nodemailer from 'nodemailer';
import 'dotenv/config';

function sendEmail(message, toEmail) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_EMAIL_P,
    },
  });
  const mailOptions = {
    // sender address
    from: process.env.USER_EMAIL,
    // list of receivers
    to: toEmail,
    // Subject line
    subject: 'Registration Successfull',
    // html body
    html: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }

    res.render('contact', { msg: 'Email has been sent' });
  });
}

export default sendEmail;