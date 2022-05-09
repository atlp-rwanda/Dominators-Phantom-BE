import model from '../database/models';
import { resetLink } from '../helpers/sendEmail';
import responseHandler from '../utils/responseHandler';
import bcrypt from 'bcryptjs';
const userModel = model.User;

const verifyEmail = async (req, res) => {
    const user_email = req.body.email;
    if (user_email == "")
        return responseHandler(res, 400, req.t('missing_params'))
    await userModel.findAll({
        where: { email: user_email }
    }).then(num => {
        if (num != "") {
            resetLink(user_email)
            responseHandler(res, 200, 'Password reset link was sent')
        } else {
            responseHandler(res, 400, req.t('no_user'))
        }
    })
}



const resetPassword = async (req, res) => {
    const password = req.body.password;
    const confirm = req.body.confirm;
    const email = req.params.id;
    if (password != confirm)
        return responseHandler(res, 400, "Bad request, Password Mismatch")
    const new_password = await bcrypt.hash(password, 12);
    await userModel.update({ password: new_password }, {
        where: { email: email }
    }).then(num => {
        if (num == 1) {
            responseHandler(res, 200, req.t('updated_ok'));
        } else {
            responseHandler(res, 400, req.t('updated_invalid_req'))
        }
    });
}



export const passwordManager = { verifyEmail, resetPassword }