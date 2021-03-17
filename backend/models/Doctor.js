const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  imagePath: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  speciality : { type: String, required: true },
  post : { type: String, required: true },
  birthday: { type: String, required: true},
  price: { type: Number, required: true },
  phone: { type: String, required: true },
});

module.exports = mongoose.model('Doctor', doctorSchema);
