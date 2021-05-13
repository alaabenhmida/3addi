let mongoose = require('mongoose');
const Doctor = require("./backend/models/Doctor");
const Patient = require("./backend/models/patient");
const Pharmacie = require("./backend/models/Pharmacie");
const bcrypt = require("bcrypt");
const faker = require('faker');
let prod = [];


for (let i = 0; i < 20; i++) {
  prod.push({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    image: 'assets/images/items/1.jpg'
  })
}
let phar = [];
for (let i=0; i<20; i++) {
  phar.push({
    name: faker.company.companyName(),
    email: faker.internet.email(),
    password: 'ala,',
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    country: faker.address.country(),
    zip: faker.address.zipCode(),
    phone: faker.phone.phoneNumber('5# ### ###'),
    imagePath: 'http://localhost:3000/images/ava-1620408329665.jpg',
    products: prod
  })
}

// let data = []
// let genders = ["Male", "Female"];
// for (let i = 0; i < 20; i++) {
//   data.push(
//     {
//       email: faker.internet.email(),
//       password: 'ala,',
//       imagePath: 'http://localhost:3000/images/ala-1618588732868.jpg',
//       name: faker.name.firstName(),
//       lastName: faker.name.lastName(),
//       gender: faker.random.arrayElement(genders),
//       address: faker.address.streetAddress(),
//       speciality: faker.name.jobType(),
//       post: faker.name.jobTitle(),
//       birthday: faker.date.past(),
//       price: faker.commerce.price(),
//       phone: faker.phone.phoneNumber('5# ### ###'),
//       address1: faker.address.streetAddress(),
//       address2: faker.address.secondaryAddress(),
//       city: faker.address.city(),
//       state: faker.address.state(),
//       country: faker.address.country(),
//       zip: faker.address.zipCode(),
//       location: {
//         latitude: faker.address.latitude(),
//         longitude: faker.address.longitude()
//       }
//     }
//   )
// }

mongoose
  .connect(
    "mongodb://127.0.0.1:27017/pfeTest", {useNewUrlParser: true, useUnifiedTopology: true}
  )
  .then(() => {
    Pharmacie.remove().then(result => {
      console.log(result);
    }).catch(error => {
      console.log(error);
    });
    phar.forEach(data => {
      bcrypt.hash('ala', 10).then(hash => {
            data.password = hash;
            Pharmacie.create(data).then(result => {
            });
          });
    });
    // Doctor.remove({}).then(result => {
    //   console.log(result);
    // }).catch(error => {
    //   console.log(error);
    // });
    // data.forEach(data => {
    //   bcrypt.hash('ala', 10).then(hash => {
    //     data.password = hash;
    //     Doctor.create(data).then(result => {
    //     });
    //   });
    // });
    console.log("Connected to database seed!");
  })
  .catch((err) => {
    console.log(err);
  });
