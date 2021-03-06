import model from '../database/models';
import { sendEmail, sendReset } from '../helpers/sendEmail';
import msg from '../utils/responseHandler';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userModel = model.User;

const verifyEmail = async (req, res) => {
  const user_email = req.body.email;
  if (user_email == '') return msg(res, 400, req.t('missing_params'));
  await userModel
    .findOne({
      where: { email: user_email },
    })
    .then((num) => {
      if (!num) msg(res, 404, req.t('no_user'));
      sendEmail({
        to: user_email,
        subject: 'Reset Password',
        html: sendReset(user_email),
      });
      msg(res, 200, 'Password reset link was sent');
    });
};

const resetPassword = async (req, res) => {
  console.log('REQUEST', req.body);
  const password = req.body.password;
  const confirm = req.body.confirm;
  let email = req.params.id;
  try {
    email = jwt.verify(email, process.env.EMAIL_CRYPT).email_id;
  } catch (error) {
    return msg(res, 403, error);
  }
  console.log(email);
  if (password != confirm)
    return msg(res, 400, 'Bad request, Password Mismatch');
  const new_password = await bcrypt.hash(password, 12);
  await userModel
    .update(
      { password: new_password },
      {
        where: { email },
      }
    )
    .then((num) => {
      console.log('NUM', num);
      1 == num
        ? msg(res, 200, req.t('updated_ok'))
        : msg(res, 400, req.t('updated_invalid_req'));
    });
};
export const passwordManager = { verifyEmail, resetPassword };
