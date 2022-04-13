import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import AppError from '../utils/appError';
import models from '../database/models';
import { promisify } from 'util';
import catchAsync from '../utils/catchAsync';

const signToken = (user) =>
  jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user);

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

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  //1)Check if email & password exist.
  if (!email || !password) {
    return next(new AppError(req.t('please'), 400));
  }

  //2)Check if user exist and password is correct

  const user = await models.User.findOne({ where: { email } });

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
  //1 Getting tocken and check its there
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
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3.check if user still exists

  const currentUser = await models.User.findOne({
    where: {
      id: decoded.user.id,
    },
  });
  console.log(currentUser);

  if (!currentUser) {
    return next(new AppError(req.t('user_nolonger_exist'), 401));
  }

  //Grant access to protected roe
  req.user = currentUser;
  next();
};
exports.UserOperator = async (req, res, next) => {
  //1 to check if user is OPerator Only
  token = req.headers.authorization.split(' ')[1];
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  if (decoded.user.role !== 'operator') {
    return next(
      new AppError("You don't have permission to perform this task ", 401)
    );
  }
  next();
};
