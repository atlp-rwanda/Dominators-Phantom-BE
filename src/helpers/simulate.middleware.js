import { promisify } from 'util';
import models from '../database/models';
import jwt from 'jsonwebtoken';
//checking the user logged in

export const checkUser = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    res.status(400).send({
      Message: 'Token required! ',
      Token: token,
    });
  } else {
    try {
      const decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
      );

      const currentUser = await models.User.findOne({
        where: {
          id: decoded.user.id,
        },
      });
      const userRole = currentUser.dataValues.role;
      if (userRole !== 'operator') {
        res.status(401).send({
          Messsage: 'Unauthorized!',
        });
      }
      next();
    } catch (error) {
      res.status(400).send({
        Message: 'Something went wrong! ' + error,
        Stack: error.stack,
      });
    }
  }
};
