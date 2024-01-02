const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const patient = require("./routes/patient");
const doctor = require("./routes/Doctor");
const pharmacie = require("./routes/Pharmacie");
const messages = require("./routes/messagesRoutes");
const admin = require("./routes/Admin");
const payment = require("./routes/Payment");

const app = express();
//process.env.MONGO_PARAMETER

mongoose
  .connect(
    "mongodb+srv://alaa:" + process.env.MONGO_ATLAS_PW + "@yourcluster.mongodb.net/?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

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
app.use("/payment", payment);


module.exports = app;
