const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  imagePath: { type: String, required: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  speciality : { type: String, required: true },
  post : { type: String, required: true },
  birthday: { type: String, required: true},
  price: { type: Number, required: true },
  phone: { type: String, required: true },
  address1: { type: String, required: true },
  address2: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  zip: { type: String, required: true },
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
    appDate : {type : String},
    status : {type : String}
  }],
  patients : [{
    id: {type : mongoose.Schema.Types.ObjectId, ref: 'Patient' }
  }],
  education : [{
    Degree: {type : String},
    College: {type : String},
    Year_of_Completion: {type : String}
  }],
  experience : [{
    hospital_Name: {type : String},
    from: {type : String},
    to: {type : String},
    designation: {type : String}
  }],
  awards : [{
    awards: {type : String},
    year: {type : String}
  }],
  memberships : [{
    Membership: {type : String}
  }],
  registrations : [{
    registrations: {type : String},
    year: {type : String}
  }],
  chatRoom: [{
    name: {type: String},
    with: { type : mongoose.Schema.Types.ObjectId, ref:'Patient' || 'Doctor'},
    messages: [{
      user: {type: String},
      to: {type: String},
      room: {type: String},
      message: {type: String},
    }]
  }],
  invoices: [{
    patient: { type : mongoose.Schema.Types.ObjectId, ref: 'Patient'},
    date: {type: String},
    price: {type: Number},
    paymentMethod: {type: String},
    cardNumber: {type: String},
    rdvDate: {type: String}
  }]
});

module.exports = mongoose.model('Doctor', doctorSchema);
