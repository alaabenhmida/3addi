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
  reviews : [{
    patientId : { type : mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    rate : { type : Number },
    title : {type : String},
    review : {type : String}
  }],
  rdv : [{
    patientId : { type : mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    patientname : { type : String },
    patienimagePath : {type : String},
    appDate : {type : String}
  }],
  patients : [{
    id: {type : mongoose.Schema.Types.ObjectId, ref: 'Patient'}
  }]
});

module.exports = mongoose.model('Doctor', doctorSchema);
