const multer = require("multer");
const path = require("path");

//Setting storage engine
const storageEngine = multer.diskStorage({
  // destination: "./uploads",
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});

const checkFileType = function (file, cb) {
  //Allowed file extensions
  const fileTypes = /jpeg|jpg|png|gif|svg/;

  //check extension names
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: You can Only Upload Images!!");
  }
};

const upload = multer({
  storage: storageEngine,
  limits: { fileSize: 10000000 },
  // fileFilter: (req, file, cb) => {
  //   checkFileType(file, cb);
  // },
});

module.exports = upload;
