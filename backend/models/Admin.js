const mongoose = require('mongoose');
const adminSchema = mongoose.Schema({
  name: {type: String},
  email: {type: String},
  password: {type: String},
  doctors: [{
    email: {type: String},
    password: {type: String},
    imagePath: {type: String},
    name: {type: String},
    lastName: {type: String},
    gender: {type: String},
    address: {type: String},
    speciality: {type: String},
    birthday: {type: String},
    price: {type: Number},
    phone: {type: String},
    city: {type: String},
    state: {type: String},
    country: {type: String},
    zip: {type: String},
    location: {
      latitude: {type: Number},
      longitude: {type: Number}
    }
  }],
  pharmacies: [{
    email: {type: String},
    password: {type: String},
    imagePath: {type: String},
    name: {type: String},
    address: {type: String},
    speciality: {type: String},
    phone: {type: String},
    city: {type: String},
    state: {type: String},
    country: {type: String},
    zip: {type: String},
    location: {
      latitude: {type: Number},
      longitude: {type: Number}
    }
  }]
});

module.exports = mongoose.model('Admin.js', adminSchema);
