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
      mor: { type : String },
      af:{ type : String },
      ev: { type : String },
      nght: { type : String },
    }],
    date : { type : String },
    doctorId : { type : mongoose.Schema.Types.ObjectId, ref:'Doctor'},
    description: {type: String},
    pharmacie: {type: mongoose.Schema.Types.ObjectId, ref:'Pharmacie'}
  }],
  medicalRecord : [{
    nom : { type : String },
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
  }],
  invoices: [{
    doctor: { type : mongoose.Schema.Types.ObjectId, ref: 'Doctor'},
    date: {type: String},
    price: {type: Number},
    paymentMethod: {type: String},
    cardNumber: {type: String},
    rdvDate: {type: String}
  }],
  cart: [{
    pharmacie: { type : mongoose.Schema.Types.ObjectId, ref: 'Pharmacie'},
    products: [{
      product: {
        id: {type: mongoose.Schema.Types.ObjectId},
        name: {type: String},
        description: {type: String},
        price: {type: Number},
        image: {type: String},
        stock: {type: Number}
      },
      quantity: {type: Number},
    }]
  }]
});

module.exports = mongoose.model('Patient', patientSchema);
