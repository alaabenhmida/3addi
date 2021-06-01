const Patient = require("../models/patient");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Doctor = require("../models/Doctor");

exports.deleteCart = (req, res, next) => {
  console.log(req.body);
  Patient.updateOne(
    {_id: req.userData.userId},
    {$pull: {cart: {pharmacie: req.body.pharmacieID}}}
  ).then(result => {
    res.status(201).json(result);
  }).catch(error => {
    res.json(error);
  });
}

exports.profileSettings = (req, res, next) => {
  let imagePath = req.body.image;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
    Patient.findOneAndUpdate({_id: req.userData.userId},
      {$set: {email: req.body.email, imagePath: imagePath, name: req.body.name,
          lastName: req.body.lastName, address: req.body.address, birthday: req.body.birthday,
          bloodType: req.body.bloodType, phone: req.body.phone, city: req.body.city,
          state: req.body.state, zip: req.body.zip, country: req.body.country}})
      .then(result => {
        res.status(201).json(result);
      }).catch(error => {
      res.json(error);
    })
  } else {
    Patient.findOneAndUpdate({_id: req.userData.userId},
      {$set: {email: req.body.email, name: req.body.name,
          lastName: req.body.lastName, address: req.body.address, birthday: req.body.birthday,
          bloodType: req.body.bloodType, phone: req.body.phone, city: req.body.city,
          state: req.body.state, zip: req.body.zip, country: req.body.country}})
      .then(result => {
        res.status(201).json(result);
      }).catch(error => {
      res.json(error);
    });
  }
}

exports.addToCart = (req, res, next) => {
  Patient.findOne({_id: req.userData.userId,
    cart : {$elemMatch: {pharmacie: req.body.pharmacie}}}).then(result => {
    if (result) {
      Patient.findOneAndUpdate({_id: req.userData.userId,
          cart : {$elemMatch: {pharmacie: req.body.pharmacie}}},
        {$set :{'cart.$.products': req.body.products}},
        {'new': true, 'safe': true, 'upsert': true})
        .then( () => {
          Patient.findOne({_id: req.userData.userId}).select({cart: {$elemMatch: {pharmacie: req.body.pharmacie}}})
            .then(result => {
              res.status(200).json(result);
            }).catch(error => {
            res.status(400).json(error);
          });
        }).catch(error => {
        res.status(400).json(error);
      });
    } else {
      Patient.updateOne({_id: req.userData.userId},
        {$push: {cart: {products: req.body.products,
              pharmacie: req.body.pharmacie}}}).then(() => {
        // invoiceID = result.cart[result.cart.length - 1]._id;
        Patient.findOne({_id: req.userData.userId}).select({cart: {$elemMatch: {pharmacie: req.body.pharmacie}}})
          .then(result => {
            res.status(200).json(result);
          }).catch(error => {
          res.status(400).json(error);
        });
      }).catch(error => {
        res.status(400).json(error);
      });
    }
  });
}

exports.getCart = (req, res, next) => {
  Patient.findOne({_id: req.userData.userId}).select({cart: {$elemMatch: {pharmacie: req.body.pharmacie}}})
    .then(result => {
      res.status(200).json(result);
    }).catch(error => {
    res.status(400).json(error);
  });
}

exports.signup = (req, res, next) => {
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
}

exports.updatePrescription = (req, res, next) => {
  Patient.findOneAndUpdate({_id: req.params.id,
      prescription: {$elemMatch: {_id: req.body.prescID}}},
    {$set: {'prescription.$.presc': req.body.presc}},
    {'new': true, 'safe': true, 'upsert': true}).then( result => {
    res.status(200).json(result)
  });
}

exports.getPatientByKey = (req, res, next) => {
  Patient.findById(req.userData.userId)
    .populate('chatRoom.with')
    .populate('rdv.doctorId')
    .populate('prescription.doctorId')
    .populate('medicalRecord.doctorId')
    .populate('invoices.doctor')
    .populate('favDocs.doctor').then(patient => {
    res.status(200).json(patient)
  }).catch(error => {
    res.status(400).json({
      message: "error was occurred",
      error: error
    });
  });
}

exports.getPrescription = (req, res, next) => {
  Patient.findOne({_id: req.params.id}).select({prescription: {$elemMatch: {_id: req.body.prescID}}})
    .populate('prescription.doctorId')
    .then(result => {
      res.status(200).json(result)
    }).catch(error => {
    res.status(404).json({
      message: "error was occurred"
    });
  });
}

exports.getRDV = (req, res, next) => {
  Patient.findOne({_id: req.userData.userId}).select({rdv: {$elemMatch: {_id: req.params.id}}})
    .populate('rdv.doctorId')
    .then(result => {
      res.status(200).json(result);
    }).catch(error => {
    res.status(404).json({
      message: "error was occurred"
    });
  });
}

exports.getPatient = (req, res, next) => {
  Patient.findById(req.params.id).populate('prescription.doctorId')
    .populate('medicalRecord.doctorId')
    .populate('rdv.doctorId').then(patient => {
    if (patient) {
      res.status(200).json(patient);
    } else {
      res.status(404).json({ message: "Patient not found!" });
    }
  });
}

exports.addInvoice = (req, res, next) => {
  let invoiceID;
  Patient.findOneAndUpdate({_id: req.userData.userId},
    {$push: {invoices: {doctor: req.body.doctor, date: req.body.date,
          price: +req.body.price, paymentMethod: req.body.paymentMethod,
          cardNumber: req.body.cardNumber, rdvDate: req.body.rdvDate}}},
    {'new': true})
    .then(result => {
      invoiceID = result.invoices[result.invoices.length - 1]._id;
      Doctor.findOneAndUpdate({_id: req.body.doctor},
        {$push: {invoices: {patient: req.userData.userId, date: req.body.date,
              price: +req.body.price, paymentMethod: req.body.paymentMethod,
              cardNumber: req.body.cardNumber, rdvDate: req.body.rdvDate}}})
        .then(result => {
          res.json({
            result: result,
            invoiceID: invoiceID
          } );
        });
    }).catch(error => {
    res.status(404).json({
      message: "error was occurred"
    });
  });
}

exports.getInvoice = (req, res, next) => {
  Patient.findById(req.userData.userId).select({invoices: {$elemMatch: {_id: req.params.id}}})
    .populate('invoices.doctor').then(result => {
    res.json(result);
  }).catch(error => {
    res.status(404).json({
      message: "error was occurred"
    });
  });
}

exports.addToFav = (req, res, next) => {
  Patient.findOne({favDocs: {$elemMatch: {doctor: req.body.doctorId}}})
    .then(result => {
      if (!result) {
        Patient.updateOne({_id: req.userData.userId},
          {$push: {favDocs: {doctor: req.body.doctorId}}}).
        then(result => {
          res.status(200).json(result);
        }).catch(error => {
          res.status(401).json({
            message: "error was occurred"
          });
        });
      }
    });
}

exports.getAllPatient = (req, res, next) => {
  let fetchedDoctors;
  Patient.find().then(documents => {
    fetchedDoctors = documents;
    return Patient.count();

  }).then(count => {
    res.status(200).json({
      message: "Patients fetched successfully!",
      posts: fetchedDoctors,
      maxPatient: count
    });
  })
    .catch(error => {
      res.status(401).json({
        message: "error was occurred"
      });
    });
}

exports.addMedRecord = (req, res, next) => {
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
      .catch(error => {
        res.status(401).json({
          message: "error was occurred"
        });
      });
  });
}

exports.deletePrescription = (req, res, next) => {
  Patient.updateOne(
    {_id: req.params.id},
    { $pull: { medicalRecord:{_id:req.body.recId} }}
  ).then(result => {
    res.status(201).json({
      message: "deleted successfully",
      result: result
    });
  })
    .catch(err => {
      res.status(400).json({
        message: "error",
        error: err
      });
    });
}

exports.addRDV = (req, res, next) => {
  let rdvId;
  Doctor.findById(req.params.id).then(doctor => {
    Patient.findOneAndUpdate(
      {_id: req.userData.userId},
      { $push: { rdv:{ doctorId:doctor._id, appDate: req.body.appDate, rdvDate: req.body.rdvDate, status: 'pending',
            doctorImage: doctor.imagePath, doctorName: doctor.name}, }},
      {'new': true}
    ).then(result => {
      rdvId = result.rdv[result.rdv.length - 1]._id;
      Patient.findById(req.userData.userId).then(patient => {
        Doctor.updateOne(
          {_id: req.params.id},
          { $push: { rdv:{ patientId:patient._id, patientname: patient.name,
                patienimagePath: patient.imagePath, appDate: req.body.rdvDate, status: 'pending'} }}).then(result => {
          res.status(201).json({
            message: "appointment added successfully to Doctor queue too",
            result: result,
            rdvId: rdvId
          })
        })
          .catch(error => {
            res.status(401).json({
              message: "error was occurred",
              error: error
            });
          });
      });
    })
      .catch(error => {
        res.status(401).json({
          message: "error was occurred"
        });
      })
  });
}

exports.login = (req, res, next) => {
  let fetchedUser;
  Patient.findOne({ email: req.body.email })
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
        message: "error occurred",
        error: err
      });
    });
}