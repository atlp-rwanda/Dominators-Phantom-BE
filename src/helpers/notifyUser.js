import socket from 'socket.io';
import { getPagination, getPagingData } from '../utils/paginationHandler';
import model from '../database/models';
function notifyUser(server) {
  const io = socket(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      //   allowedHeaders: ['Authorization'],
      //   credentials: true,
    },
  });
  const userId = [];

  io.on('connection', (client) => {
    userId.push(client.id);
    console.log(client.id);
    client.on('login', async (data) => {
      const res = await model.DriverNotification.findAndCountAll({
        include: [
          {
            model: model.Notification,
            as: 'Notification',
          },
          {
            model: model.User,
            as: 'User',
          },
        ],
        order: [['createdAt', 'DESC']],
      }).catch((error) => {
        console.log(error.message);
      });
      client.emit('notification', res);
    });
    client.on('viewNotification', async (data) => {
      await model.DriverNotification.update(
        {
          viewStatus: true,
        },
        {
          where: { id: data },
        }
      );
      const res = await model.DriverNotification.findAndCountAll({
        include: [
          {
            model: model.Notification,
            as: 'Notification',
          },
          {
            model: model.User,
            as: 'User',
          },
        ],
      }).catch((error) => {
        error.message;
      });
      client.emit('changed', res);
    });

    client.on('disconnect', (data) => {
      delete userId[socket.id];
    });
  });
}

export default notifyUser;
