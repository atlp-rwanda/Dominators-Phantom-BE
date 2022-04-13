import models from '../database/models';
// import {fileUpload} from "../utils/multer"
const User = models.User;
const Profile = models.Profile


const allUsers = async (req, res) => {
  return Profile.findAll()

    .then((data) => {
      console.log(data);
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


const findOneUser = (req, res) => {
  const { id } = req.params;
  Profile.findOne({
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
        error: req.t('invalid_id') || err.message,
      })
    );
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const {
    firstName,
    lastName,
    phone,
    email,
    role,
    profilePic,
    province,
    district,
    sector,
    cell,
    village,
    bio,
    category,
    gender,
    nationalId,
  } = req.body;
  try {
    const user = await User.findOne({ where: { id } });
if(!user){
  return res.status(404).json({message:'no user found with this ID'})
} 

const userProfile = await Profile.create({
  firstName,
  lastName,
  userId: user.id,
  phone,
  email,
  role,
  profilePic,
  province,
  district,
  sector,
  cell,
  village,
  bio,
  category,
  gender,
  nationalId,})

    res.status(201).json({
      status: 'success',
      message: 'User Updated Successully',
      data: {
        userProfile,
      },
    });
  } catch (error) {
    res.status(404).json({
      message: 'No user with that ID',
      Error: error.stack,
    });
    console.error(error)
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
      Error: error.stack,
    });
  }
};

export { allUsers, findOneUser, updateUser, deleteUser };
