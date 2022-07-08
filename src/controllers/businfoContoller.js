import model from '../database/models';

const buses = model.Bus;
const AssignDriver = model.AssignDriver;
const routes = model.routes;
const Journey = model.Journey;
const User = model.User;

const enquireBusInfo = async (req, res) => {
  const id = req.params.id;
  let userBus = [];
  let journeyBus = [];

  const busFound = await buses.findOne({
    where: { id: id },
  });
  if (busFound) {
    const assignBus = await AssignDriver.findAll({
      where: { BusId: id },
    });
    if (assignBus.length != 0) {
      for (let i = 0; i < assignBus.length; i++) {
        userBus.push(
          await User.findOne({
            where: { id: assignBus[i].UserId },
          })
        );

        journeyBus.push(
          await Journey.findOne({
            where: {
              routeID: busFound.routeId,
              busID: id,
              driverID: assignBus[i].UserId,
            },
          })
        );
      }
    }

    const routeBus = await routes.findOne({
      where: { routeId: busFound.routeId },
    });

    // removing password, createdAt and updatedAt from the output
    for (let i = 0; i < userBus.length; i++) {
      userBus[i].dataValues.password = undefined;
      userBus[i].dataValues.createdAt = undefined;
      userBus[i].dataValues.updatedAt = undefined; 
    }

    const response = {
      busId: id,
      prateNumber: busFound.prateNumber,
      busType: busFound.busType,
      allDriverBus: userBus,
      busRoute: {
        routeId: routeBus.routeId,
        route: `${routeBus.origin} to ${routeBus.destination}`,
        distance: routeBus.distance,
        status: routeBus.status,
        fromCoordinates: routeBus.fromCoordinates,
        toCoordinates: routeBus.toCoordinates
      },
      journey: journeyBus,
    };

    res.status(200).json({
      data: response,
    });
  } else {
    res.status(404).json({
      message: 'Bus not found',
    });
  }
};

export { enquireBusInfo };