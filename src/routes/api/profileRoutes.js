import express from 'express';
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 82aaf0d0e4e9cbfb31458228314870e50d879539
import {
  allUsers,
  findOneUser,
  updateUser,
  deleteUser,
} from '../../controllers/profilecontroller';
<<<<<<< HEAD
=======

import { allUsers, findOneUser, updateUser, deleteUser } from '../../controllers/profilecontroller'
>>>>>>> d741551 (ft crud operation for bus:)
=======
>>>>>>> 82aaf0d0e4e9cbfb31458228314870e50d879539
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
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Unsupported files'), false);
  }
};

const uploadImg = multer({ storage, fileFilter }).single('profilePic');

router.get('/', allUsers);
router.post('/:id/update', uploadImg, updateUser);
router.get('/:id', findOneUser);
router.delete('/:id', deleteUser);

export default router;
