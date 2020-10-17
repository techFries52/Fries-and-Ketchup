const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({ 
    cloud_name: process.env.cloud_name, 
    api_key: process.env.cloud_key,
    api_secret: process.env.cloud_secret
  });
  
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "Fries",
        allowedFormats: ["jpeg", "png", "jpg"]
    }
});

module.exports = {
    cloudinary,
    storage
}