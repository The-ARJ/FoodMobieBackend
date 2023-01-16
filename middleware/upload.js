const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'profile') {
      cb(null, './uploads/user-profiles');
    } else if (file.fieldname === 'foodImage') {
      cb(null, './uploads/food-images');
    }
    else if (file.fieldname === 'notifyImage') {
      cb(null, './uploads/notification-images');
    }
  },
  filename: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}--${Date.now()}${ext}`);
  },
});

const imageFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Invalid file format. Only jpg, jpeg, png and gif are allowed.'), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter: imageFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;
