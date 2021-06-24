let mongoose = require('mongoose');
const Doctor = require("./backend/models/Doctor");
const Patient = require("./backend/models/patient");
const Pharmacie = require("./backend/models/Pharmacie");
const bcrypt = require("bcrypt");
const faker = require('faker');
// let prod = [];
//
//
// for (let i = 0; i < 20; i++) {
//   prod.push({
//     name: faker.commerce.productName(),
//     description: faker.commerce.productDescription(),
//     price: faker.commerce.price(),
//     image: 'assets/images/items/1.jpg'
//   })
// }
// let phar = [];
// for (let i=0; i<20; i++) {
//   phar.push({
//     name: faker.company.companyName(),
//     email: faker.internet.email(),
//     password: 'ala,',
//     address: faker.address.streetAddress(),
//     city: faker.address.city(),
//     state: faker.address.state(),
//     country: faker.address.country(),
//     zip: faker.address.zipCode(),
//     phone: faker.phone.phoneNumber('5# ### ###'),
//     imagePath: 'http://localhost:3000/images/ava-1620408329665.jpg',
//     products: prod
//   })
// }
let location = [
  {latitude: 35.828113, longitude: 10.611763},
  {latitude: 35.76385712086968, longitude: 10.82131862640381},
  {latitude: 35.77158743162626, longitude: 10.808959007263185},
  {latitude: 35.767339335824644, longitude: 10.8056116104126},
  {latitude: 35.75821909082465, longitude: 10.811061859130861},
  {latitude: 35.82060169062259, longitude: 10.629100799560549},
  {latitude: 35.816147414714855, longitude: 10.621204376220703},
  {latitude: 35.6980227281262, longitude: 10.740852355957031},
  {latitude: 35.74484966427712, longitude: 10.810203552246094},
]
let data = []
let names = ["Mohamed", "abbas", "Ali", "Amir", "Bassam", "Hosni", "Kamel", "Karim", "Khalid", "Mahdi",
"Mansour", "Omar", "Salem", "Aya", "Rania", "Saida", "Mounira"];
let lastNames = ["Trabelsi", "Gharbi","Hammami", "Dridi", "Ayari", "Mejri", "Ayadi", "Riahi", "Oueslati",
"Ben Amor", "Kamoun", "Amara", "Bahri"];
let gouv = ["Ariana", "Béja", "Sousse", "Bizerte", "Gabès", "Nabeul", "Jendouba", "Kairouan",
"Zaghouan", "Kebili", "Kef", "Mahdia", "Manouba", "Medenine", "Monastir", "Gafsa", "Sfax",
"Sidi Bouzid", "Siliana", "Ben Arous", "Tataouine", "Tozeur", "Tunis", "Kasserine"];
let genders = ["Homme", "Femme"];
let spec = ["Urologie", "Neurologie", "Dentiste", "Orthopédique", "Cardiologue", "Generale"];
for (let i = 0; i < 10; i++) {
  data.push(
    {
      email: faker.internet.email(),
      password: 'ala,',
      imagePath: `${faker.image.people()}?random=${Date.now()}`,
      name: faker.random.arrayElement(names),
      lastName: faker.random.arrayElement(lastNames),
      gender: faker.random.arrayElement(genders),
      address: faker.address.streetAddress(),
      speciality: faker.random.arrayElement(spec),
      post: faker.name.jobTitle(),
      birthday: faker.date.past(),
      price: faker.commerce.price(),
      phone: faker.phone.phoneNumber('5# ### ###'),
      address1: faker.address.streetAddress(),
      address2: faker.address.secondaryAddress(),
      city: faker.address.city(),
      state: faker.random.arrayElement(gouv),
      country: 'Tunisie',
      zip: faker.address.zipCode(),
      location: location[i]
    }
  )
}

mongoose
  .connect(
    "mongodb://127.0.0.1:27017/pfeTest", {useNewUrlParser: true, useUnifiedTopology: true}
  )
  .then(() => {
    // Pharmacie.remove().then(result => {
    //   console.log(result);
    // }).catch(error => {
    //   console.log(error);
    // });
    // phar.forEach(data => {
    //   bcrypt.hash('ala', 10).then(hash => {
    //         data.password = hash;
    //         Pharmacie.create(data).then(result => {
    //         });
    //       });
    // });
    Doctor.remove({}).then(result => {
      console.log(result);
    }).catch(error => {
      console.log(error);
    });
    data.forEach(data => {
      bcrypt.hash('ala', 10).then(hash => {
        data.password = hash;
        Doctor.create(data).then(result => {
        });
      });
    });
    console.log("Connected to database seed!");
  })
  .catch((err) => {
    console.log(err);
  });
