const multer = require("multer");
const path = require("path");
const sharp = require('sharp');


//Validate upload file
const FILE_TYPE_MAP = {
  "image/jpeg": "jpeg",
  "image/png": "png",
  "image/jpg": "jpg",
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "profile") {
      cb(null, "./uploads/user-profiles");
    } else if (file.fieldname === "notifyImage") {
      cb(null, "./uploads/notification_images");
    } else if (file.fieldname === "userImage") {
      const isValid = FILE_TYPE_MAP[file.mimetype];
      if (!isValid) cb(new Error("Invalid file type"), "./uploads/user_images");
      cb(null, "./uploads/user_images");
    }else if (file.fieldname === "foodImage") {
      const isValid = FILE_TYPE_MAP[file.mimetype];
      if (!isValid) cb(new Error("Invalid file type"), "./uploads/food_images");
      cb(null, "./uploads/food_images");
    }
  },
  filename: (req, file, cb) => {
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `IMG-${Date.now()}.${extension}`);
  },
});

const imageFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(
      new Error(
        "Invalid file format. Only jpg, jpeg, png and gif are allowed."
      ),
      false
    );
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter: imageFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;
