const mongoose = require('mongoose');

const patientSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  imagePath: { type: String, required: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String},
  birthday: { type: String, required: true},
  bloodType: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String},
  state: { type: String},
  zip: { type: String, required: true },
  country: { type: String, required: true },
  rdv : [{
    doctorId : { type : mongoose.Schema.Types.ObjectId, ref: 'Doctor'},
    appDate : { type : String},
    rdvDate : { type : String},
    status : { type : String, defaultValue: 'pending'},
    doctorImage : { type : String },
    doctorName : { type : String },
  }],
  prescription : [{
    presc : [{
      name: { type : String },
      quantite: { type : String },
      days: { type : String },
      mor: { type : Boolean },
      af:{ type : Boolean },
      ev: { type : Boolean },
      nght: { type : Boolean },
    }],
    date : { type : String },
    doctorId : { type : mongoose.Schema.Types.ObjectId, ref:'Doctor'}
  }],
  medicalRecord : [{
    date : { type : String },
    description : { type : String },
    attachment : { type : String },
    doctorId : { type : mongoose.Schema.Types.ObjectId, ref: 'Doctor'},
    doctorImage : { type : String },
    doctorName : { type : String },
  }],
  chatRoom: [{
    name: {type: String},
    with: { type : mongoose.Schema.Types.ObjectId, ref:'Doctor' || 'Patient'},
    messages: [{
      user: {type: String},
      to: {type: String},
      room: {type: String},
      message: {type: String},
    }]
  }],
  favDocs: [{
    doctor: { type : mongoose.Schema.Types.ObjectId, ref: 'Doctor'}
  }]
});

module.exports = mongoose.model('Patient', patientSchema);
