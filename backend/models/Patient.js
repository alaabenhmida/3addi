const mongoose = require('mongoose');

const patientSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  imagePath: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  birthday: { type: String, required: true},
  bloodType: { type: String, required: true },
  phone: { type: String, required: true },
  rdv : [{
    doctorId : { type : mongoose.Schema.Types.ObjectId},
    appDate : { type : String},
    rdvDate : { type : String},
    status : { type : String, defaultValue: 'pending'},
    doctorImage : { type : String },
    doctorName : { type : String },
  }],
  prescription : [{
    date : { type : String },
    name : { type : String },
    doctorId : { type : mongoose.Schema.Types.ObjectId}
  }],
  medicalRecord : [{
    date : { type : String },
    description : { type : String },
    attachment : { type : String },
    doctorId : { type : mongoose.Schema.Types.ObjectId, ref: 'Doctor'},
    doctorImage : { type : String },
    doctorName : { type : String },
  }]
});

module.exports = mongoose.model('Patient', patientSchema);
