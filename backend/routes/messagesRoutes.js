const express = require("express");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();
const Patient = require("../models/patient");
const Doctor = require("../models/Doctor");

router.post("/addroom", (req, res, next) => {
  let patientres = null;
  Patient.findOne({'chatRoom.name': req.body.roomName}).then(res => {
    if (!res) {
      Patient.updateOne({_id: req.body.patientId},
        {$push: {chatRoom: {name: req.body.roomName, with: req.body.doctorId, messages: []}}})
        .then(result => {
          patientres = result
          Doctor.updateOne({_id: req.body.doctorId},
            {$push: {chatRoom: {name: req.body.roomName, with: req.body.patientId, messages: []}}})
            .then(result => {
              res.status(200).json(result);
            }).catch(error => {
            res.status(500).json({
              message: 'something wrong in messages',
              error: error
            })
          });
        });
    }
  }).catch(error => {
    res.status(500).json({
      message: 'something wrong in messages',
      error: error
    })
  })

});

router.put("/getChat", (req, res, next) => {

  if (req.body.role === 'doctor') {
    Doctor.findOne({_id: req.body.userId}).select({chatRoom: {$elemMatch: {name: req.body.roomName}}})
      .populate('chatRoom.with')
      .then(result => {
        res.status(200).json(result)
      }).catch(error => {
      res.json(error);
    })
  } else {
    Patient.findOne({_id: req.body.userId}).select({chatRoom: {$elemMatch: {name: req.body.roomName}}})
      .populate('chatRoom.with')
      .then(result => {
        res.status(200).json(result)
      }).catch(error => {
      res.json(error);
    })
  }
})

module.exports = router;
