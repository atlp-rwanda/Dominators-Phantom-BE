import models from '../database/models';
import { fileUpload } from '../utils/multer';
const User = models.User;
const Profile = models.Profile;

const allUsers = async (req, res) => {
  return Profile.findAll()

    .then((data) => {
      if (data.length === 0) {
        return res.status(404).json({
          message: req.t('no_users'),
        });
      }
      return res.status(200).json({
        data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: err.message,
      });
    });
};

const findOneProfile = (req, res) => {
  const { id } = req.params;
  Profile.findOne({
    where: {
      userId: id,
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
      res.status(404).json({
        error: req.t('invalid_id') || err.message,
      })
    );
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({ message: 'no user found with this ID' });
    }
    if (req.file) {
      req.body.profilePic = await fileUpload(req);
    }

    const {
      firstName,
      lastName,
      phone,
      email,
      role,
      province,
      district,
      sector,
      cell,
      village,
      bio,
      category,
      gender,
      nationalId,
      profilePic,
    } = req.body;

    await Profile.update(
      {
        firstName,
        lastName,
        email,
        role,
        province,
        district,
        sector,
        cell,
        village,
        bio,
        category,
        gender,
        nationalId,
        profilePic,
        updatedAt: new Date(),
      },
      { where: { userId: user.id } }
    );

    res.status(201).json({
      status: 'success',
      message: 'User Updated Successully',
    });
  } catch (error) {
    res.status(404).json({
      message: 'Something went wrong!',
    });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await Profile.findOne({
      where: { id },
    });

    await user.destroy();

    res.status(200).json({
      status: 'success',
      message: 'User Deleted Successully',
    });
  } catch (error) {
    res.status(404).json({
      message: 'No user with that ID',
    });
  }
};

export { allUsers, findOneProfile, updateUser, deleteUser };
