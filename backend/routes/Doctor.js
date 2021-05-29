const express = require("express");

const multer = require("multer");
const Doctor = require("../models/Doctor");
const jwt = require("jsonwebtoken");
const Patient = require("../models/patient");
const checkAuth = require("../middleware/check-auth");
const bcrypt = require("bcrypt");
const router = express.Router();

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

router.get("/invoice/:id", checkAuth, (req, res, next) => {
  Doctor.findById(req.userData.userId).select({invoices: {$elemMatch: {_id: req.params.id}}})
    .populate('invoices.patient').then(result => {
    res.json(result);
  }).catch(error => {
    res.json(error);
  })
});

router.post("/patient/:id/addpresc", checkAuth, (req, res, next) => {
  Patient.updateOne({_id: req.params.id},
    { $push: { prescription: {presc: req.body.presc, date: req.body.date,
          doctorId: req.userData.userId}} }).then(result => {
      res.status(200).json(result);
  }).catch(error => {
    res.status(400).json(error);
  })
});
router.put("/find", (req, res, next) => {
  console.log(req.body);
  let genders;
  let speciality;
  if (req.body.genders === []) {
    genders = ["Male, Female"]
  } else {
    genders = req.body.genders
  }
  if (req.body.speciality === []) {
    speciality = ["Urologie", "Neurologie", "Dentiste", "Orthopédique", "Cardiologue", "Generale"];
  } else {
    speciality = req.body.speciality
  }
  Doctor.find({
    "$and": [
      {gender: {$in: genders}},
      {speciality: {$in: speciality}},
      {"city": new RegExp(req.body.name, 'i')}
    ]
  }).then(result => {
    res.json(result)
  }).catch(error => {
    res.json(error);
  })
  // Doctor.find({"city": new RegExp(req.body.name, 'i'),
  //   gender: {$in: genders}}).then(result => {
  //   res.json(result)
  // }).catch(error => {
  //   res.json(error);
  // })
});

router.put("/workingtimes", checkAuth, (req, res, next) => {
  Doctor.findByIdAndUpdate(req.userData.userId,
    {$set: {workingTime: req.body}},
    {'new': true, 'safe': true, 'upsert': true})
    .then(result => {
      res.status(201).json(result);
    }).catch(error => {
     res.json(error);
  });
});

router.get("/:name/:state", (req, res, next) => {
  Doctor.find().and([
    {name: req.params.name},
    {state: req.params.state}
  ]).then(result => {
    res.json(result)
  }).catch(error => {
    res.json(error);
  })
});

router.put("", multer({storage: storage}).single("image"), checkAuth,
  (req, res, next) => {
  let imagePath = req.body.image;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
    Doctor.findOneAndUpdate({_id: req.userData.userId},
      {$set: {name: req.body.firstName, lastName: req.body.lastName, phone: req.body.phone,
          address1: req.body.address1, address2: req.body.address2, city: req.body.city,
          state: req.body.state, country: req.body.country, zip: req.body.zip, price: +req.body.price,
          aboutMe: req.body.aboutMe,'location.latitude': +req.body.latitude, 'location.longitude': +req.body.longitude,
          gender: req.body.gender, birthday: req.body.birthday, imagePath: imagePath,
          education: JSON.parse(req.body.education), experience: JSON.parse(req.body.experience),
          awards: JSON.parse(req.body.awards), memberships: JSON.parse(req.body.memberships),
          registrations: JSON.parse(req.body.registrations)}},
      {'new': true, 'safe': true, 'upsert': true}).then(result => {
      res.status(201).json({result: result,
        message: 'modified successfully'});
    }).catch(error => {
      res.status(400).json(error);
    })
  } else {
    Doctor.findOneAndUpdate({_id: req.userData.userId},
      {$set: {name: req.body.firstName, lastName: req.body.lastName, phone: req.body.phone,
          address1: req.body.address1, address2: req.body.address2, city: req.body.city,
          state: req.body.state, country: req.body.country, zip: req.body.zip, price: +req.body.price,
          aboutMe: req.body.aboutMe,'location.$.latitude': +req.body.latitude, 'location.$.longitude': +req.body.longitude,
          gender: req.body.gender, birthday: req.body.birthday,
          education: JSON.parse(req.body.education), experience: JSON.parse(req.body.experience),
          awards: JSON.parse(req.body.awards), memberships: JSON.parse(req.body.memberships),
          registrations: JSON.parse(req.body.registrations)}},
      {'new': true, 'safe': true, 'upsert': true}).then(result => {
      res.status(201).json({result: result,
      message: 'modified successfully'});
    }).catch(error => {
      res.status(400).json(error);
    })
  }

})

router.post("/rdv/accept", checkAuth, (req, res, next) => {
  let docRes;
  Doctor.findOne({patients: {$elemMatch: {id: req.body.patientId}}})
    .then(result => {
      if (!result) {
        Doctor.updateOne({_id: req.userData.userId},
          { $push: { patients:{ id: req.body.patientId} }}).then(result =>{
          docRes = result
        }).catch(error => {
          docRes = error;
        })
      }
    });

  Doctor.findOneAndUpdate({_id: req.userData.userId,
    rdv: {$elemMatch: {patientId: req.body.patientId, appDate: req.body.appDate}}},
    {$set: {'rdv.$.status': 'confirmed'}},
    {'new': true, 'safe': true, 'upsert': true}).then( res => {
  });

  Patient.findOneAndUpdate({_id: req.body.patientId,
      rdv: {$elemMatch: {doctorId: req.userData.userId, rdvDate: req.body.appDate}}},
    {$set: {'rdv.$.status': 'confirmed'}},
    {'new': true, 'safe': true, 'upsert': true}).then(result => {
      res.status(200).json({
        message: "success",
        result: result
      })
  }).catch(error => {
    res.status(400).json(error);
  });
})

router.post("/rdv/cancel", checkAuth, (req, res, next) => {
  Patient.findOneAndUpdate({_id: req.body.patientId,
      rdv: {$elemMatch: {doctorId: req.userData.userId, rdvDate: req.body.appDate}}},
    {$set: {'rdv.$.status': 'canceled'}},
    {'new': true, 'safe': true, 'upsert': true}).then(result => {
    res.status(200).json({
      message: "success",
      result: result
    }).catch(error => {
      res.status(400).json(error);
    })
  });

  Doctor.findOneAndUpdate({_id: req.userData.userId,
      rdv: {$elemMatch: {patientId: req.body.patientId, appDate: req.body.appDate}}},
    {$set: {'rdv.$.status': 'canceled'}},
    {'new': true, 'safe': true, 'upsert': true}).then( res => {
  });
})

router.get("/getdocbykey", checkAuth, (req, res, next) => {
  Doctor.findById(req.userData.userId)
    .populate('invoices.patient')
    .populate('reviews.patientId')
    .populate('patients.id')
    .populate('chatRoom.with')
    .populate('rdv.patientId').then(doctor => {
    res.status(200).json(doctor)
  }).catch(error => {
    res.status(400).json({
      message: "error was occurred",
      error: error
    })
  })
});

router.post("/signup",
  multer({storage: storage}).single("image"),
  (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
      const url = req.protocol + "://" + req.get("host");
      // console.log(req.body)
      const doctor = new Doctor({
        email: req.body.email,
        password: hash,
        imagePath: url + "/images/" + req.file.filename,
        name: req.body.name,
        address: req.body.address,
        speciality: req.body.speciality,
        post: req.body.post,
        birthday: req.body.birthday,
        price: +req.body.price,
        phone: req.body.phone
      })
      doctor.save().then(result => {
        res.status(201).json({
          message: "doctor created!",
          result: result
        });
      }).catch(err => {
        res.status(500).json({
          error: err,
        });
      });
    });
  })

router.get("/:id", (req, res, next) => {
  Doctor.findById(req.params.id)
    .populate('reviews.patientId').then(doctor => {
    if (doctor) {
      res.status(200).json(doctor);
    } else {
      res.status(404).json({ message: "doctor not found!" });
    }
  });
});

router.put("/speciality", (req, res, next) => {
  Doctor.count({speciality: req.body.speciality}).then(count => {
    res.status(200).json(count);
  }).catch(error => {
    res.status(404).json(error);
  });
});

router.get("", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const doctorQuery = Doctor.find();
  let fetchedDoctors;
  if (pageSize && currentPage) {
    doctorQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  doctorQuery.then(documents => {
    fetchedDoctors = documents;
    return Doctor.count();
  })
    .then(count => {
      res.status(200).json({
        message: "doctors fetched successfully!",
        doctors: fetchedDoctors,
        maxDoctors: count
      });
    });
});


router.post("/login", (req, res, next) => {
  let fetchedUser;
  Doctor.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "email not exist"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "password incorrect"
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
        message: "something went wrong"
      });
    });
});


router.post("/:id/addreview", checkAuth, (req, res, next) => {
  Patient.findById(req.userData.userId).then(patient => {
    Doctor.updateOne(
      {_id: req.params.id},
      { $push: { reviews:{ patientId:patient._id, rate: +req.body.rate, title: req.body.title, review: req.body.review} }}
    ).then(result => {
      res.status(201).json({
        message: "reviewed successfully",
        result: result
      })
    })
      .catch(err => {
        console.log(err);
      });
  });
});




module.exports = router;
