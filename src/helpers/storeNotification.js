import model from '../database/models';
import responseHandler from '../utils/responseHandler';
export const storeNotificationForDrivers = (NotifMessage, driverId) => {
  try {
    model.Notification.create({ message: NotifMessage })
      .then((data) => {
        console.log('Save Notification' + data);
        model.DriverNotification.create({
          userId: driverId,
          notificationId: data.notificationId,
          viewStatus: false,
        })
          .then((notification) => {
            console.log('Notification Saved Well' + notification);
          })
          .catch((error) => {
            console.log(error.message);
          });
      })
      .catch((error) => {
        console.log(error.messag);
      });
  } catch (error) {
    console.log(error.message);
  }
};
