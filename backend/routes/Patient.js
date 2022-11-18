const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const extractImage = require("../middleware/image");
const extractpdf = require("../middleware/pdfExtractor");
const patient = require("../controllers/Patient");


router.put("/deletecart", checkAuth, patient.deleteCart);
router.put("", extractImage, checkAuth, patient.profileSettings);
router.put("/addtocart", checkAuth, patient.addToCart);
router.put("/getcart", checkAuth, patient.getCart);
router.put("/verifyPassword", checkAuth, patient.verifyPassword);
router.put("/changepassword", checkAuth, patient.changePassword);
router.delete("/:id", checkAuth, patient.deletePatient);
router.post("/signup", extractImage, patient.signup);
router.put("/:id/updatepresc", patient.updatePrescription);
router.put("/signpresc", checkAuth, patient.signPrescription);
router.get("/getPatbykey", checkAuth, patient.getPatientByKey);
router.put("/:id/getpresc/", patient.getPrescription);
router.put("/:id/getcertificat/", patient.getCertificat);
router.get("/:id/getrdv/", checkAuth, patient.getRDV);
router.get("/:id", patient.getPatient);
router.put("/addinvoice", checkAuth, patient.addInvoice);
router.put("/addinvoicephar", checkAuth, patient.addInvoicePharmacie);
router.get("/getinvoicePhar/:id", checkAuth, patient.getInvoicePhar);
router.get("/invoice/:id", checkAuth, patient.getInvoice);
router.put("/addfav", checkAuth, patient.addToFav);
router.get("", patient.getAllPatient);
router.put("/:id", extractpdf, checkAuth, patient.addMedRecord);
router.put("/:id/delrecord", checkAuth, patient.deleteMedRecor);
router.put("/:id/delpresc", checkAuth, patient.deletePrescription);
router.post("/:id/rdv", checkAuth, patient.addRDV);
router.post("/login", patient.login);

module.exports = router;
