import model from '../database/models';
import { getPagination, getPagingData } from '../utils/paginationHandler';
import responseHandler from '../utils/responseHandler';
import {
  sendNotification,
  sendNotficationUnAssigned,
} from '../helpers/sendNotification';
import { storeNotificationForDrivers } from '../helpers/storeNotification';
const AssignDriver = model.AssignDriver;
const User = model.User;
const getAllNotifications = async (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  await model.DriverNotification.findAndCountAll({
    limit,
    offset,
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
  }).then((data) => {
    const response = getPagingData(data, page, limit);
    const noneViewed = response.result.filter(
      ({ viewStatus, userId }) => viewStatus == false
    );
    res.status(200).json({ data: response });
  });
};
const patchDriverViewNotification = async (req, res) => {
  try {
    const notificationId = req.params.notificationId;
    await model.DriverNotification.update(
      {
        viewStatus: true,
      },
      {
        where: { id: notificationId },
      }
    ).then((result) => {
      result.length > 0 && responseHandler(res, 201, req.t('updated_ok'), req);
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
const getAllDriverAssignToBuses = async (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  await AssignDriver.findAndCountAll({
    limit,
    offset,
    include: [
      {
        model: model.User,
        as: 'Users',
      },
      {
        model: model.Bus,
        as: 'Buses',
      },
    ],
  }).then((data) => {
    const response = getPagingData(data, page, limit);
    res.status(200).json({ data: response });
  });
};
const getAllDriverUnAssigned = async (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  await User.findAndCountAll({
    limit,
    offset,
    exclude: [
      {
        model: model.AssignDriver,
        as: 'AssignDriver',
      },
    ],
  }).then((data) => {
    const response = getPagingData(data, page, limit);
    res.status(200).json({ data: response });
  });
};

const PostAssignDriverToBuses = async (req, res) => {
  if (
    (!req.params.driverId && !req.params.busId) ||
    req.params.driverId == '' ||
    req.params.busId == ''
  )
    return responseHandler(res, 400, req.t('missing_params'), req);
  try {
    const NewDriver = AssignDriver.findOrCreate({
      where: {
        UserId: req.params.driverId,
      },
      defaults: { BusId: req.params.busId },
    }).then((created) => {
      created[1]
        ? responseHandler(
            res,
            201,
            { message: req.t('driver_to_buses_create'), NewDriver: created[0] },
            req
          ) +
          User.findOne({
            where: {
              id: req.params.driverId,
            },
          }).then((data) => {
            model.Bus.findOne({
              where: {
                id: req.params.busId,
              },
            }).then((buses) => {
              const message = `
                 <h2>Hello ${
                   data.firstName + ' ' + data.lastName
                 } You have been assigned Buse to drive with this PlateNumber ${
                buses.prateNumber
              }</h2>
                 <p>please visit your Account and check new buse and be ready to start to drive</p>
                 `;
              const NotifMessage = `${
                data.firstName + ' ' + data.lastName
              } You have been assigned Buse to drive with this PlateNumber ${
                buses.prateNumber
              }`;
              storeNotificationForDrivers(NotifMessage, req.params.driverId);
              sendNotification(message, data.email);
            });
          })
        : responseHandler(
            res,
            400,
            { message: req.t('driver_has_assigned_exit') },
            req
          );
    });
  } catch (error) {
    res.send(error.message);
  }
};
const findOneAssign = async (req, res) => {
  const AssignedId = req.params.id;
  try {
    await AssignDriver.findOne({
      where: {
        id: AssignedId,
      },
      include: [
        {
          model: model.User,
          as: 'Users',
        },
        {
          model: model.Bus,
          as: 'Buses',
        },
      ],
    }).then((data) => {
      null != data
        ? res.status(200).json({ data: data })
        : responseHandler(res, 404, req.t('record_not_found'), req);
    });
  } catch (error) {
    responseHandler(res, 500, req.t('fail'), req);
  }
};
const UpdateOneAssign = (req, res) => {
  try {
    const AssignedId = req.params.id;
    AssignDriver.update(
      {
        UserId: req.body.userId,
        BusId: req.body.buseId,
      },
      {
        where: { id: AssignedId },
      }
    ).then((result) => {
      result.length > 0 && responseHandler(res, 201, req.t('updated_ok'), req);
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
const UnAssignDriver = async (req, res) => {
  try {
    const id = req.params.id;
    const CurrentUser = AssignDriver.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: model.User,
          as: 'Users',
        },
        {
          model: model.Bus,
          as: 'Buses',
        },
      ],
    })
      .then((data) => {
        const message = `
      <h2>Hello ${
        data.Users.firstName + ' ' + data.Users.lastName
      } You have been Unassigned Buse to drive with this PlateNumber ${
          data.Buses.prateNumber
        }</h2>
      <p>please visit wait while the operator are still finding new buse to assigne to you</p>
      `;
        const NotifMessage = `${
          data.Users.firstName + ' ' + data.Users.lastName
        } You have been Unassigned Buse to drive with this PlateNumber ${
          data.Buses.prateNumber
        }`;
        storeNotificationForDrivers(NotifMessage, data.Users.id);
        sendNotficationUnAssigned(message, data.Users.email);
      })
      .then(() => {
        AssignDriver.destroy({
          where: { id: id },
        }).then((num) => {
          1 == num
            ? responseHandler(res, 200, req.t('deleted_ok'), req)
            : responseHandler(res, 400, req.t('delete_invalid_req'), req);
        });
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export {
  getAllDriverAssignToBuses,
  PostAssignDriverToBuses,
  getAllDriverUnAssigned,
  findOneAssign,
  UpdateOneAssign,
  UnAssignDriver,
  getAllNotifications,
  patchDriverViewNotification,
};
