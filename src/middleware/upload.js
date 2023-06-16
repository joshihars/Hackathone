const multer = require("multer");

// for uploading image 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // for creating upload folder 
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });

  const upload = multer({ storage: storage });

  module.exports = {upload }