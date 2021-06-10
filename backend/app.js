const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const patient = require("./routes/patient");
const doctor = require("./routes/Doctor");
const pharmacie = require("./routes/Pharmacie");
const messages = require("./routes/messagesRoutes");
const admin = require("./routes/Admin");

const app = express();

mongoose
  .connect(
    "mongodb://127.0.0.1:27017/pfeTest",{ useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(( err ) => {
    console.log(err);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/patient", patient);
app.use("/doctor", doctor);
app.use("/messages", messages);
app.use("/pharmacies", pharmacie);
app.use("/admin", admin);


module.exports = app;
