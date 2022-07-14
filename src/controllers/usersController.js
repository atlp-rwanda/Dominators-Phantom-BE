import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import generatePassword from '../helpers/generatePassword';
import { sendEmail } from '../helpers/sendEmail';
import model from '../database/models';

const User = model.User;
const Role = model.roles;
const Profile = model.Profile;

dotenv.config();

const addUser = async (req, res) => {
  const { firstName, lastName, email, role } = req.body;
  const userpassword = generatePassword();
  const password = await bcrypt.hash(userpassword, 12);
  const frontendUrl = process.env.FRONTEND_URL;
  const roleFound = await Role.findOne({
    where: {
      name: role,
    },
  });

  if (firstName === '' || lastName === '' || email === '' || role === '') {
    return res.status(500).json({
      message: req.t('required_field'),
    });
  } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
    return res.status(400).json({
      message: req.t('email_invalid'),
    });
  } else if (!roleFound) {
    return res.status(404).json({ message: req.t('Role is not found') });
  }
  User.findOne({
    where: {
      email,
    },
  }).then((emailExists) => {
    if (emailExists) {
      return res.status(400).json({
        message: 'email_exists',
      });
    }
    return User.create({
      firstName,
      lastName,
      email,
      role,
      password,
    })
      .then((data) => {
        if (data) {
          const query = encodeURIComponent(
            `email=${data.email}&password=${userpassword}`
          );
          Profile.create({
            userId: data.id,
            firstName,
            lastName,
            email,
            role,
            createdAt: new Date(),
          });
          const html = `
              <h2>Your account has been registered. you can now login in</h2>
              <a href="${frontendUrl}/login?${query}">here</a>
              <p>${req.body.email}. Note that your login password will be <em>${userpassword}</em></p>
              `;
          sendEmail({ to: data.email, subject: 'Registration', html });
          res.status(201).json({
            message: req.t('user_created'),
            data,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({
          error: err.message,
        });
      });
  });
};

const allUsers = (req, res) => {
  return User.findAll({
    attributes: {
      exclude: ['password'],
    },
    include: 'profiles',
  })
    .then((data) => {
      console.log(data);
      if (data.length === 0) {
        res.status(404).json({
          message: req.t('no_users'),
        });
      } else {
        res.status(200).json({
          data,
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        error: err.message,
      });
    });
};

const findOneUser = (req, res) => {
  const { id } = req.params;
  User.findOne({
    where: {
      id,
    },
    attributes: {
      exclude: ['password'],
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          message: req.t('no_user'),
        });
      }
      return res.status(200).json({
        user,
      });
    })
    .catch((err) =>
      res.status(400).json({
        error: 'invalid input id, it must be a number' || err.message,
      })
    );
};

const update = (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, role } = req.body;
  User.findOne({
    where: {
      id,
    },
    attributes: {
      exclude: ['password'],
    },
  }).then((user) => {
    if (!user) {
      return res.status(400).json({
        message: req.t(`user_id`),
      });
    }
    return user
      .update({
        firstName: firstName || user.firstName,
        lastName: lastName || user.lastName,
        role: role || user.role,
      })
      .then((updatedUser) => {
        res.status(200).json({
          message: req.t(`user_update`),
          updatedUser: {
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            role: updatedUser.role,
            email: updatedUser.email,
          },
        });
      });
  });
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({
        message: req.t(`uesr_exists`),
      });
    }
    const deleteUser = await user.destroy();
    const deleteProfile = await Profile.destroy({ where: { userId: id } });
    if (deleteUser && deleteProfile) {
      return res.status(200).json({
        message: req.t(`user_deleted`),
      });
    }
    return res.status(400).json({
      message: 'failed to delete user',
    });
  } catch (error) {
    res.status(400).json({
      message: 'Something went wrong, ' + error,
    });
  }
};

export { addUser, allUsers, findOneUser, update, deleteUser };
