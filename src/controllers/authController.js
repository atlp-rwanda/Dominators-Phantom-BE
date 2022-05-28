import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import AppError from '../utils/appError';
import models from '../database/models';
import { promisify } from 'util';
import catchAsync from '../utils/catchAsync';
import { setToken } from '../config/redix';
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = async (user, statusCode, res) => {
  const token = signToken(user.dataValues.id);
  await setToken(token, token);

  //remove the password from the output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

export const logout = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const delTok = await deleteToken(token);
    if (!delTok) {
      res.status(500).json({ message: 'error while clearing your data' });
    }
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'There was error loging out' });
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  //1)Check if email & password exist.
  if (!email || !password) {
    return next(new AppError(req.t('please'), 400));
  }

  //2)Check if user exist and password is correct

  const user = await models.User.findOne({
    where: { email },
    include: 'profiles',
  });

  const correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };
  if (!user || !(await correctPassword(password, user.password))) {
    return next(new AppError(req.t('incorrect'), 401));
  }

  //3)if everything is ok, then send token to user
  createSendToken(user, 200, res);
};

let token;
exports.protect = async (req, res, next) => {
  //1 Getting tocken and check its ther
  if (!req.headers.authorization)
    return next(new AppError(req.t('not_logged_in'), 500));
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError(req.t('not_logged_in'), 401));
  }
  // 2. verificatoin token
  var decoded;
  console.log(decoded);
  try {
    decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  } catch (error) {
    return next(new AppError('You need to login again', 401));
  }

  // 3.check if user still exists
  const currentUser = await models.User.findOne({
    where: {
      id: decoded.user.id,
    },
  });

  if (!currentUser) {
    return next(new AppError(req.t('user_nolonger_exist'), 401));
  }

  //Grant access to protected roe
  req.user = currentUser;
  next();
};

exports.UserOperator = async (req, res, next) => {
  //1 to check if user is OPerator Only
  if (req.user.role !== 'operator') {
    return next(
      new AppError("You don't have permission to perform this task ", 401)
    );
  }
  if (!token || token.length === 4 || token === 'loggedout') {
    return next(
      new AppError('You are not logged in! please login to get access', 401)
    );
  }

  next();
};
