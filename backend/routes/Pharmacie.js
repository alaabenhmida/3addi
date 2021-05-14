const express = require("express");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();
const Pharmacie = require("../models/Pharmacie");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.put("/getProduct", (req, res, next) => {
  Pharmacie.findById(req.body.pharmacieID).select({products: {$elemMatch: {_id: req.body.productID}}})
    .then(result => {
      res.status(200).json(result);
    }).catch(error => {
      res.status(400).json(error);
  });
});

router.get("/getbykey", checkAuth, (req, res, next) => {
  Pharmacie.findOne({_id: req.userData.userId}).then(pharmacie => {
    res.status(200).json(pharmacie);
  }).catch(error => {
    res.status(404).json(error);
  });
});

router.post("/:id/addreview", checkAuth, (req, res, next) => {
    Pharmacie.updateOne(
      {_id: req.params.id},
      { $push: { reviews:{ patientId:req.userData.userId, rate: +req.body.rate, title: req.body.title, review: req.body.review} }}
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

router.put("/find", (req, res, next) => {
  Pharmacie.find({city: new RegExp(req.body.city, 'i')}).then(result => {
    res.status(200).json(result)
  }).catch(error => {
    res.status(404).json(error);
  });
});

router.get("/:id", (req, res, next) => {
  Pharmacie.findById(req.params.id)
    .populate('reviews.patientId').then(result => {
    if (result) {
      res.status(200).json(result)
    } else {
      res.status(404).json({message: "not found"})
    }
  }).catch(error => {
    res.status(400).json({
      message: "not found",
      error: error
    });
  });
});

router.get("", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const pharmacieQuery = Pharmacie.find();
  let fetchedPharmacies;
  if (pageSize && currentPage) {
    pharmacieQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  pharmacieQuery.then(documents => {
    fetchedPharmacies = documents;
    return Pharmacie.countDocuments();
  })
    .then(count => {
      res.status(200).json({
        message: "pharmacies fetched successfully!",
        pharmacies: fetchedPharmacies,
        maxPharmacies: count
      });
    });
});


router.post("/login", (req, res, next) => {
  let fetchedUser;
  Pharmacie.findOne({ email: req.body.email })
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
        user: fetchedUser,
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "error occurred",
        error: err
      });
    });
});

module.exports = router;
