const express = require("express");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const multer = require("multer");

const nodemailer = require('nodemailer');


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

router.post("/sendmail", (req, res, next) => {
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'alabenhmida933@gmail.com',
      pass: 'alafarhat'
    }
  });
  transporter.sendMail({
    from: '3addi.tn',
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.text
  });
});

router.get("", (req, res, next) => {
  Admin.find().then(admin => {
    res.status(200).json(admin);
  }).catch(err => {
    res.status(404).json(err);
  });
});


router.delete("/deldoc/:id", (req, res, next) => {
  Admin.updateOne({_id: "60bf8db44f7bdb27342dde75"},
    {$pull: {doctors: {_id: req.params.id}}}).then(result => {
    res.status(200).json(result);
  }).catch(error => {
    console.log(error);
    res.status(400).json(error);
  });
});

router.delete("/delphar/:id", (req, res, next) => {
  Admin.updateOne({_id: "60bf8db44f7bdb27342dde75"},
    {$pull: {pharmacies: {_id: req.params.id}}}).then(result => {
    res.status(200).json(result);
  }).catch(error => {
    console.log(error);
    res.status(400).json(error);
  });
});

router.get("/getpharmacie/:id", (req, res, next) => {
  Admin.findOne({_id: "60bf8db44f7bdb27342dde75"}).select({pharmacies: {$elemMatch: {_id: req.params.id}}})
    .then(result => {
      res.status(200).json(result);
    }).catch(error => {
    res.status(404).json(error);
  });
});

router.get("/getdoctor/:id", (req, res, next) => {
  Admin.findOne({_id: "60bf8db44f7bdb27342dde75"}).select({doctors: {$elemMatch: {_id: req.params.id}}})
    .then(result => {
      res.status(200).json(result);
    }).catch(error => {
    res.status(404).json(error);
  });
});

router.post("/adddoctor", multer({storage: storage}).single("image"), (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const url = req.protocol + "://" + req.get("host");
    Admin.updateOne({_id: "60bf8db44f7bdb27342dde75"},
      {
        $push: {
          doctors: {
            email: req.body.email,
            password: hash,
            imagePath: url + "/images/" + req.file.filename,
            name: req.body.name,
            lastName: req.body.lastName,
            gender: req.body.gender,
            address: req.body.address,
            speciality: req.body.speciality,
            birthday: req.body.birthday,
            price: +req.body.price,
            phone: req.body.phone,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            zip: req.body.zip,
            location: {
              latitude: req.body.latitude,
              longitude: req.body.longitude
            }
          }
        }
      }).then(result => {
      res.status(200).json(result);
    }).catch(error => {
      res.status(500).json(error);
    });
  });
});

router.post("/addpharmacie", multer({storage: storage}).single("image"), (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const url = req.protocol + "://" + req.get("host");
    Admin.updateOne({_id: "60bf8db44f7bdb27342dde75"},
      {
        $push: {
          pharmacies: {
            email: req.body.email,
            password: hash,
            imagePath: url + "/images/" + req.file.filename,
            name: req.body.name,
            address: req.body.address,
            speciality: req.body.speciality,
            phone: req.body.phone,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            zip: req.body.zip,
            location: {
              latitude: req.body.latitude,
              longitude: req.body.longitude
            }
          }
        }
      }).then(result => {
      res.status(200).json(result);
    }).catch(error => {
      res.status(500).json(error);
    });
  });
});

module.exports = router;
