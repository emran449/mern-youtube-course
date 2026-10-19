const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
    cloud_name: 'kvqid0zl',
    api_key: '647315543166486',
    api_secret: 'EdS4BrjyyPPg8VoHzXFBl9wwrSM'
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file){
    const result = await cloudinary.uploader.upload(file, {
        resource_type : 'auto'
    });

    return result;
}

const upload = multer({storage});

module.exports = {upload, imageUploadUtil}