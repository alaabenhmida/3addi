const express = require("express");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();
const Pharmacie = require("../models/Pharmacie");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require("multer");
const moment = require("moment");

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

router.post("/signup", multer({storage: storage}).single("image"), (req, res, next) => {
  const pharmacie = new Pharmacie({
    email: req.body.email,
    password: req.body.password,
    imagePath: req.body.image,
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
  })
  pharmacie.save().then(result => {
    res.status(201).json({
      message: "pharmacie created!",
      result: result
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  });
});

router.put("/edit", multer({storage: storage}).single("image"), checkAuth,
  (req, res, next) => {
    let imagePath = req.body.image;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename;
      Pharmacie.findOneAndUpdate({_id: req.userData.userId},
        {
          $set: {
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            zip: req.body.zip,
            phone: req.body.phone,
            imagePath: imagePath,
            type: req.body.type,
            aboutMe: req.body.aboutMe,
            awards: JSON.parse(req.body.awards),
            'location.latitude': +req.body.latitude,
            'location.longitude': +req.body.longitude
          }
        })
        .then(result => {
          res.status(201).json(result);
        }).catch(error => {
        res.status(400).json(error);
      });
    } else {
      Pharmacie.findOneAndUpdate({_id: req.userData.userId},
        {
          $set: {
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            zip: req.body.zip,
            phone: req.body.phone,
            type: req.body.type,
            aboutMe: req.body.aboutMe,
            awards: JSON.parse(req.body.awards),
            'location.latitude': +req.body.latitude,
            'location.longitude': +req.body.longitude
          }
        })
        .then(result => {
          res.status(201).json(result);
        }).catch(error => {
        res.status(400).json(error);
      });
    }
  });

router.put("/getProductbyid", checkAuth, (req, res, next) => {
  Pharmacie.findById(req.userData.userId).select({products: {$elemMatch: {_id: req.body.productID}}})
    .then(result => {
      res.status(200).json(result);
    }).catch(error => {
    res.status(400).json(error);
  });
});

router.put("/getProductByName", checkAuth, (req, res, next) => {
  Pharmacie.findById(req.body.pharmacieID).select({products: {$elemMatch: {name: req.body.productName}}})
    .then(result => {
      res.status(200).json(result.products[0]);
    }).catch(error => {
    res.status(400).json(error);
  });
});

router.put("/getProduct", checkAuth, (req, res, next) => {
  Pharmacie.findById(req.body.pharmacieID).select({products: {$elemMatch: {_id: req.body.productID}}})
    .then(result => {
      res.status(200).json(result);
    }).catch(error => {
    res.status(400).json(error);
  });
});

router.delete("/product/:id", checkAuth, (req, res, next) => {
  Pharmacie.findOneAndUpdate({_id: req.userData.userId},
    {$pull: {products: {_id: req.params.id}}},
    {'new': true, 'safe': true, 'upsert': true}).then(result => {
    res.status(201).json(result);
  }).catch(error => {
    res.status(400).json(error);
  });
});

router.get("/order/:id", checkAuth, (req, res, next) => {
  Pharmacie.findById(req.userData.userId)
    .select({orders: {$elemMatch: {_id: req.params.id}}})
    .populate('orders.patient')
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    }).catch(error => {
    res.status(400).json(error);
  });
});

router.put("/addorder", checkAuth, (req, res, next) => {
  Pharmacie.findOneAndUpdate({_id: req.userData.userId},
    {
      $push: {
        orders: {
          patient: req.body.patient, products: req.body.cart,
          date: moment(new Date().toString()).format("YYYY-MM-DDTHH:mm:ss")
        }
      }
    },
    {'new': true, 'safe': true, 'upsert': true}).then(result => {
    res.status(201).json(result);
  }).catch(error => {
    res.status(400).json(error);
  });
});
router.put("/decreasequantite", checkAuth, (req, res, next) => {
  Pharmacie.findOneAndUpdate({
      _id: req.body.pharmacieId,
      products: {$elemMatch: {name: req.body.product.name}}
    },
    {
      $set: {
        'products.$.stock': +req.body.product.stock - +req.body.quantity
      }
    },
    {'new': true, 'safe': true, 'upsert': true}).then(result => {
    // res.status(201).json(result);
    Pharmacie.findOneAndUpdate({_id: req.body.pharmacieId},
      {
        $push: {
          sales: {
            patient: req.userData.userId, name: req.body.product.name, description: req.body.product.description,
            price: +req.body.product.price, image: req.body.product.image, quantity: +req.body.quantity,
            date: moment(new Date().toString()).format("YYYY-MM-DDTHH:mm:ss")
          }
        }
      },
      {'new': true, 'safe': true, 'upsert': true})
      .then(result => {
        res.status(201).json(result);
      }).catch(error => {
      console.log(error);
      res.status(400).json({
        message: "error occurred",
        error: error
      });
    });
  }).catch(error => {
    console.log(error);
    res.status(401).json({
      message: "error occurred",
      error: error
    });
  });
});

router.put("/editproduct/:id",
  multer({storage: storage}).single("image"), checkAuth,
  (req, res, next) => {
    if (req.file) {
      let imagePath = req.body.image;
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename;
      Pharmacie.findOneAndUpdate({
          _id: req.userData.userId,
          products: {$elemMatch: {_id: req.params.id}}
        },
        {
          $set: {
            'products.$.name': req.body.name, 'products.$.description': req.body.description,
            'products.$.price': +req.body.price, 'products.$.image:': imagePath,
            'products.$.stock': +req.body.stock
          }
        },
        {'new': true, 'safe': true, 'upsert': true}).then(result => {
        res.status(201).json(result);
      }).catch(error => {
        res.status(401).json({
          message: "error occurred",
          error: error
        });
      });
    } else {
      Pharmacie.findOneAndUpdate({
          _id: req.userData.userId,
          products: {$elemMatch: {_id: req.params.id}}
        },
        {
          $set: {
            'products.$.name': req.body.name, 'products.$.description': req.body.description,
            'products.$.price': +req.body.price,
            'products.$.stock': +req.body.stock
          }
        },
        {'new': true, 'safe': true, 'upsert': true}).then(result => {
        res.status(201).json(result);
      }).catch(error => {
        res.status(401).json({
          message: "error occurred",
          error: error
        });
      });
    }
  });

router.put("/addproduct",
  multer({storage: storage}).single("image"), checkAuth, (req, res, next) => {
    let imagePath = req.body.image;
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
    Pharmacie.findOneAndUpdate({_id: req.userData.userId},
      {
        $push: {
          products: {
            name: req.body.name, description: req.body.description,
            price: +req.body.price, image: imagePath, stock: +req.body.stock
          }
        }
      },
      {'new': true, 'safe': true, 'upsert': true})
      .then(result => {
        res.status(201).json(result);
      }).catch(error => {
      console.log(error);
      res.status(400).json({
        message: "error occurred",
        error: error
      });
    });
  });


router.get("/getbykey", checkAuth, (req, res, next) => {
  Pharmacie.findOne({_id: req.userData.userId})
    .populate('sales.patient')
    .populate('orders.patient')
    .then(pharmacie => {
      res.status(200).json(pharmacie);
    }).catch(error => {
    res.status(404).json(error);
  });
});

router.post("/:id/addreview", checkAuth, (req, res, next) => {
  Pharmacie.updateOne(
    {_id: req.params.id},
    {
      $push: {
        reviews: {
          patientId: req.userData.userId,
          rate: +req.body.rate,
          title: req.body.title,
          review: req.body.review
        }
      }
    }
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
  const pharmacieQuery = Pharmacie.aggregate([
    {$addFields: {averageRating: {$avg: "$reviews.rate"}}}
  ]);
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
  Pharmacie.findOne({email: req.body.email})
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
        {email: fetchedUser.email, userId: fetchedUser._id},
        "secret_this_should_be_longer",
        {expiresIn: "1h"}
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
