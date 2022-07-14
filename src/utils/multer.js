import cloudinary from './cloudinary.js';

export const fileUpload = async (req) => {
  let profilePic = '';

  await cloudinary.v2.uploader.upload(
    req.file.path,
    async function (err, image) {
      if (err) console.log(err);
      if (image) profilePic = image.url;
    }
  );

  return profilePic;
};
