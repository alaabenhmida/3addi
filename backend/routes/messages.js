exports = module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log("user connected");
    socket.on('message', (msg) => {
      console.log(msg);
      io.emit('message broad', msg);
    });

  });
}
