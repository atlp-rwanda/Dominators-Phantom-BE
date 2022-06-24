import cloudinary from "cloudinary"
import { clear } from "../helpers/clearuploads"



export const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true)
    } else {
      cb(new Error('Unsupported files'), false)
    }
  }  

export const fileUpload = async (req) => {
    let profilePic = "";
    await cloudinary.v2.uploader.upload(
      req.file.path,
      async function (err, image) {
        if (err) console.log(err);
        profilePic = image.url;
      }
    );
    clear()
    return profilePic;
  };
  
  
