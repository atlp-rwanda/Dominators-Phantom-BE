import app from './app';
import prop from './config/config';
import socket from 'socket.io';

const currentConfig = prop[process.env.NODE_ENV];
const { port } = currentConfig;
const server = app.listen(port, () =>
  console.log(`App listening on ${port}!....`)
);

const io = socket(server, {
  cors: {
    origin: process.env.SOCKET_FRONTED_URL,
    method: ['GET', 'POST'],
  },
});

io.on('connection', (client) => {
  //console.log('Client connected successfully! 🔥 ' + client.id);

  client.on('COORDINATES', (journey) => {
    io.emit('COORDINATES', journey);
  });

  client.on('SPEED', (speed) => {
    if (speed.action == 'speed_up') {
      speed.currentSpeed = speed.currentSpeed + 5;
    } else {
      speed.currentSpeed = speed.currentSpeed - 5;
    }
    io.emit('SPEED', speed);
  });

  client.on('STATUS', (status) => {
    if (status == 'Ended') {
      console.log('MOTION ', status);
    }
    io.emit('STATUS', status);
  });

  client.on('PASSENGERS', (seats) => {
    console.log(seats);

    io.emit('PASSENGERS', seats);
  });

  client.on('ESTIMATION_TIME', (timeExpected) => {
    console.log(timeExpected);
    io.emit('ESTIMATION_TIME', timeExpected);
  });

  client.on('TRAFFIC_STATUS', (traffic) => {
    console.log(traffic);
    io.emit('TRAFFIC_STATUS', traffic);
  });

  client.on('disconnect', () => {
    console.log("Client '" + client.id + "' disconnected!");
  });
});

export default server;
