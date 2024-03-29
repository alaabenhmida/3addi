const express = require("express");
const extractImage = require("../middleware/image");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();
const doctor = require("../controllers/Doctor");
const Doctor = require("../models/Doctor");
const bcrypt = require("bcryptjs");


router.delete("/delete", checkAuth, (req, res, next) => {
  console.log("wsol");
  Doctor.findOneAndDelete({_id: req.userData.userId}).then(result => {
    res.status(201).json(result);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});
router.get("/invoice/:id", checkAuth, doctor.getInvoice);
router.post("/patient/:id/addpresc", checkAuth, doctor.addPrescription);
router.post("/patient/:id/addcertificat", checkAuth, doctor.addCertificat);
router.put("/find", doctor.search);
router.put("/workingtimes", checkAuth, doctor.updateWorkingTime);
router.get("/:name/:state", doctor.findByNameAndState);
router.put("", extractImage, checkAuth, doctor.profileSettings);
router.post("/rdv/accept", checkAuth, doctor.acceptRDV);
router.post("/rdv/cancel", checkAuth, doctor.cancelRDV);
router.get("/getdocbykey", checkAuth, doctor.getDoctorByKey);
router.post("/signup", extractImage, doctor.signup);
router.get("/:id", doctor.getDoctorByID);
router.put("/speciality", doctor.getSpecialityCount);
router.get("", doctor.getAllDoctors);
router.post("/login", doctor.login);
router.post("/:id/addreview", checkAuth, doctor.addReview);
router.delete("/:id", (req, res, next) => {
  Doctor.findOneAndDelete({_id: req.params.id}).then(result => {
    res.status(201).json(result);
  }).catch(err => {
    res.status(500).json(err);
  });
});

router.put("/verifyPassword", checkAuth, (req, res, next) => {
  let fetchedUser;
  Doctor.findOne({_id: req.userData.userId}).then(user => {
    fetchedUser = user
    return bcrypt.compare(req.body.password, user.password);
  }).then(result => {
    if (!result) {
      return res.status(401).json({
        message: "mot de passe incorrect"
      });
    }
    res.status(200).json({
      message: "password correct"
    });
  })
    .catch(err => {
      console.log(err);
      return res.status(401).json({
        message: "something went wrong"
      });
    });
});


module.exports = router;
