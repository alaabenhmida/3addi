const mongoose = require('mongoose');
const messsageSchema = mongoose.Schema({
  user: {type: String, required: true},
  room: {type: String, required: true},
  message: {type: String, required: true},
});

module.exports = mongoose.model('Message', messsageSchema);
