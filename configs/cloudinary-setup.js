const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.cloudName,
  api_key: process.env.cloudKey,
  api_secret: process.env.cloudSecret
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'gallery',
    allowedFormats: ['jpg', 'png'],
    filename: function (req, res, cb) {
        let fileName = res.originalname.split(".")
        return fileName[0]
  },
}});

 
const uploader = multer({ storage });
module.exports = uploader;