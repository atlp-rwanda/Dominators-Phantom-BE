import express from 'express';
import {
  allUsers,
  findOneUser,
  updateUser,
  deleteUser,
} from '../../controllers/profilecontroller';
import cloudinary from '../../utils/cloudinary';
import permMiddleware from '../../helpers/checkPermission';

import multer from 'multer';
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported files'), false);
  }
};
// const fileUpload = async (req) => {
//   let profilePic = "";
//   await cloudinary.v2.uploader.upload(
//     req.file.path,
//     async function (err, image) {
//       if (err) console.log(err);
//       profilePic = image.url;
//     }
//   );
//   return profilePic;
// };

const uploadImg = multer({ storage: storage }).single('profilePic', fileFilter);

router.get('/', permMiddleware.checkPermission, allUsers);
router.post('/:id/update', uploadImg, updateUser);
router.get('/:id', findOneUser);
router.delete('/:id', deleteUser);

export default router;
