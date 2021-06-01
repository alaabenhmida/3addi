const express = require("express");

const multer = require("multer");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();
const doctor = require("../controllers/Doctor");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});


router.get("/invoice/:id", checkAuth, doctor.getInvoice);
router.post("/patient/:id/addpresc", checkAuth, doctor.addPrescription);
router.put("/find", doctor.search);
router.put("/workingtimes", checkAuth, doctor.updateWorkingTime);
router.get("/:name/:state", doctor.findByNameAndState);
router.put("", multer({storage: storage}).single("image"), checkAuth, doctor.profileSettings);
router.post("/rdv/accept", checkAuth, doctor.acceptRDV);
router.post("/rdv/cancel", checkAuth, doctor.cancelRDV);
router.get("/getdocbykey", checkAuth, doctor.getDoctorByKey);
router.post("/signup", multer({storage: storage}).single("image"), doctor.signup);
router.get("/:id", doctor.getDoctorByID);
router.put("/speciality", doctor.getSpecialityCount);
router.get("", doctor.getAllDoctors);
router.post("/login", doctor.login);
router.post("/:id/addreview", checkAuth, doctor.addReview);


module.exports = router;
