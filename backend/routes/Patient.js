const express = require("express");

const multer = require("multer");
const Patient = require("../models/patient");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const Doctor = require("../models/Doctor");

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


router.post("/signup",
  multer({storage: storage}).single("image"),
  (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
      const url = req.protocol + "://" + req.get("host");
      const patient = new Patient({
        email: req.body.email,
        password: hash,
        imagePath: url + "/images/" + req.file.filename,
        name: req.body.name,
        address: req.body.address,
        birthday: req.body.birthday,
        bloodType: req.body.bloodType,
        phone: req.body.bloodType
      })
      patient.save().then(result => {
        res.status(201).json({
          message: "Patient created!",
          result: result
        });
      }).catch(err => {
        res.status(500).json({
          error: err
        });
      });
    });

  })


router.get("/:id", (req, res, next) => {
  Patient.findById(req.params.id).then(patient => {
    if (patient) {
      res.status(200).json(patient);
    } else {
      res.status(404).json({ message: "Patient not found!" });
    }
  });
});

router.get("", (req, res, next) => {
  Patient.find().then(documents => {
    res.status(200).json({
      message: "Patients fetched successfully!",
      posts: documents
    });
  });
})

router.put("/:id", checkAuth, (req, res, next) => {

  Doctor.findById(req.userData.userId).then(doctor => {
    Patient.updateOne(
      {_id: req.params.id},
      { $push: { medicalRecord:{ date:req.body.date, description:req.body.description, attachment: req.body.file, doctorId: doctor._id,
            doctorImage: doctor.imagePath, doctorName: doctor.name} }}
    ).then(result => {
      res.status(201).json({
        message: "added successfully",
        result: result
      })
    })
      .catch(err => {
      console.log(err);
    });
  });
});

router.post("/login", (req, res, next) => {
  let fetchedUser;
  Patient.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        user: fetchedUser
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Auth failed"
      });
    });
})

module.exports = router;
