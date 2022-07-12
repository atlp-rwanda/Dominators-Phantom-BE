import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const [frontendUrl, from, pass] = [
  'FRONTEND_URL',
  'USER_EMAIL',
  'USER_EMAIL_P',
].map((e) => process.env[e]);

function sendEmail(params) {
  const { to, subject, html } = params;
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: { user: from, pass },
  });
  let mailOptions = { from, to, subject, html };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error.message);
    }
  });
}

function sendReset(email) {
  var token = jwt.sign({ email_id: email }, process.env.EMAIL_CRYPT, {
    expiresIn: '1h',
  });

  const url = `${frontendUrl}/Reset?token=${token}`;
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

export { sendEmail, sendReset };
