const express = require("express");

const multer = require("multer");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const patient = require("../controllers/Patient");
//////////pdf////////
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
    cb(error, "backend/images");
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
//////////////////////////
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

router.put("/deletecart", checkAuth, patient.deleteCart);
router.put("", multer({storage: storage}).single("image"), checkAuth, patient.profileSettings);
router.put("/addtocart", checkAuth, patient.addToCart);
router.put("/getcart", checkAuth, patient.getCart);
router.post("/signup", multer({storage: storage}).single("image"), patient.signup);
router.put("/:id/updatepresc", patient.updatePrescription);
router.put("/signpresc", checkAuth, patient.signPrescription);
router.get("/getPatbykey", checkAuth, patient.getPatientByKey);
router.put("/:id/getpresc/", patient.getPrescription);
router.get("/:id/getrdv/", checkAuth, patient.getRDV);
router.get("/:id", patient.getPatient);
router.put("/addinvoice", checkAuth, patient.addInvoice);
router.get("/invoice/:id", checkAuth, patient.getInvoice);
router.put("/addfav", checkAuth, patient.addToFav);
router.get("", patient.getAllPatient);
router.put("/:id", multer({storage: pdfstorage}).single("image"), checkAuth, patient.addMedRecord);
router.put("/:id/delrecord", checkAuth, patient.deleteMedRecor);
router.put("/:id/delpresc", checkAuth, patient.deletePrescription);
router.post("/:id/rdv", checkAuth, patient.addRDV);
router.post("/login", patient.login);

module.exports = router;
