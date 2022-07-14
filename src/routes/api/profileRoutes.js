import express from 'express';
import {
  allUsers,
  updateUser,
  deleteUser,
  findOneProfile,
} from '../../controllers/profilecontroller';
import permMiddleware from '../../helpers/checkPermission';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb('invalid image file!', false);
  }
};

const uploadImg = multer({ storage, fileFilter });

router.get('/', permMiddleware.checkPermission, allUsers);
router.patch('/:id/update', uploadImg.single('profilePic'), updateUser);
router.get('/:id/profile', findOneProfile);
router.delete('/:id', deleteUser);

export default router;
