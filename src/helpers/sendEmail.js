import 'dotenv/config';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

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

function sendReset(email) {
  var token = jwt.sign({ email_id: email }, process.env.EMAIL_CRYPT, {
    expiresIn: '1h',
  });

  const url = `https://localhost:3000/api/v1/users/reset/${token}`;
  const msg = `<h2>DOMINATORS</h2>
<h4>Password Reset Link</h4>
<div>
  <a href='${url}' target='__blank'>
  <button style='width:160;height:24; background-color:#97cfc3'>Reset Password
  </button></a><br>
  </div>
`;
  return msg;
}

function resetLink(user) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.APP_MAIL,
      pass: process.env.APP_MAIL_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.APP_MAIL, // sender address
    to: user, // list of receivers
    subject: 'Reset Password', // Subject line
    html: sendReset(user), // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return 0;
    else return 1;
  });
}

export { sendEmail, resetLink };
