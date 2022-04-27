import cloudinary from 'cloudinary';
import dotenv from "dotenv"

dotenv.config({
    path:"../env"
})
cloudinary.config({
    cloudinary_url: process.env.CLOUDINARY_URL,
    cloud_name: process.env.CLOUD,
    api_key: process.env.KEY, 
    api_secret: process.env.SECRET 
})

export default cloudinary;