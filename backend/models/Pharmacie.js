const mongoose = require('mongoose');

const pharmacieSchema = mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String},
  password: {type: String},
  address: {type: String},
  city: {type: String},
  state: {type: String},
  country: {type: String},
  zip: {type: String},
  phone: {type: String},
  imagePath: {type: String},
  type: {type: String},
  aboutMe: {type: String},
  products: [{
    name: {type: String},
    description: {type: String},
    price: {type: Number},
    image: {type: String},
    stock: {type: Number}
  }],
  sales: [{
    patient: {type : mongoose.Schema.Types.ObjectId, ref: 'Patient'},
    name: {type: String},
    description: {type: String},
    price: {type: Number},
    image: {type: String},
    quantity: {type: Number},
    date: {type: String}
  }],
  reviews : [{
    patientId : { type : mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    rate : { type : Number },
    title : {type : String},
    review : {type : String}
  }],
  awards: [{
    awards: {type: String},
    year: {type: String}
  }],
  orders: [{
    patient: { type : mongoose.Schema.Types.ObjectId, ref: 'Patient'},
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
    }],
    date: {type: String}
  }],
  location: {
    latitude: {type: Number},
    longitude: {type: Number}
  }
})

module.exports = mongoose.model('Pharmacie', pharmacieSchema);
