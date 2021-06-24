const express = require("express");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();
const Doctor = require("../models/Doctor");
const Patient = require("../models/patient");
exports = module.exports = (io) => {

  io.on('connection', (socket) => {
    let previousId;
    const safeJoin = currentId => {
      socket.leave(previousId);
      console.log("user left room " + previousId);
      socket.join(currentId);
      previousId = currentId;
    };

    console.log("user connected");

    socket.on('join', data => {
      safeJoin(data.room);
      // socket.join(data.room);
      console.log(data.user + ' joined the room : ' + data.room);
      socket.broadcast.to(data.room).emit('new user joined', {user: data.user, message: ' has joined the room'});
    });

    socket.on('leave', data => {
      safeJoin(data.room);
      // socket.join(data.room);
      console.log(data.user + ' left the room : ' + data.room);
      socket.broadcast.to(data.room).emit('left room', {user: data.user, message: ' has left his room'});
      socket.leave(data.room);
    });

    socket.on('message', data => {
      Doctor.findOne({_id: data.user}).then(result => {
        if (result) {
          Doctor.findOneAndUpdate({
              _id: data.user,
              chatRoom: {$elemMatch: {name: data.room}}
            },
            {$push: {'chatRoom.$.messages': data}},
            {'new': true, 'safe': true, 'upsert': true}).catch(error => {
            console.log(error);
          });
        } else {
          Patient.findOneAndUpdate({
              _id: data.user,
              chatRoom: {$elemMatch: {name: data.room}}
            },
            {$push: {'chatRoom.$.messages': data}},
            {'new': true, 'safe': true, 'upsert': true}).catch(error => {
            console.log(error);
          });
        }
      })

      Doctor.findOne({_id: data.to}).then(result => {
        if (result) {
          Doctor.findOneAndUpdate({
              _id: data.to,
              chatRoom: {$elemMatch: {name: data.room}}
            },
            {$push: {'chatRoom.$.messages': data}},
            {'new': true, 'safe': true, 'upsert': true}).catch(error => {
            console.log(error);
          });
        } else {
          Patient.findOneAndUpdate({
              _id: data.to,
              chatRoom: {$elemMatch: {name: data.room}}
            },
            {$push: {'chatRoom.$.messages': data}},
            {'new': true, 'safe': true, 'upsert': true}).catch(error => {
            console.log(error);
          });
        }
      })

      io.in(data.room).emit('new message', {user: data.user, message: data.message});
    })

  });
}
