const multer = require("multer");
const PDF_TYPE_MAP = {
  "application/pdf": "pdf"
};

const pdfstorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = PDF_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = PDF_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

module.exports = multer({storage: pdfstorage}).single("image");
