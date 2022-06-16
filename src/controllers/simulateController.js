import model from '../database/models/';
import { draw } from '../helpers/drawCoordinates';
const journeys = model.Journey;
const assign = model.AssignDriver;
const buses = model.Bus;
const routes = model.routes;

//command bus to start moving
export const createJourney = async (req, res) => {
  if (!req.body.JourneyTitle || !req.body.Speed || !req.body.passengers) {
    res.status(400).send({
      Message: 'Oops! All fields required!',
    });
    return null;
  }
  try {
    const checkAssign = await assign.findAll({ where: { UserId: '1' } });
    const busId = checkAssign[0].BusId;
    const busInfo = await buses.findAll({
      where: {
        id: busId,
      },
    });
    const routeId = busInfo[0].routeId;
    const routeInfo = await routes.findAll({
      where: { routeId: 'd97074c1-1d7e-4432-b4f5-adaa15831dd7' },
    });

    const lat = parseFloat(routeInfo[0].coordinates[0]);
    const long = parseFloat(routeInfo[0].coordinates[1]);

    const point = draw(lat, long);
    // res.json({
    //   Message: 'MBPA!',
    //   Route: point,
    // });
    const driverId = checkAssign[0].UserId;

    const resp = await journeys.findOrCreate({
      where: {
        journeyTitle: req.body.JourneyTitle,
        currentLocation: point,
        speed: req.body.Speed,
        timeExpected: req.body.timeExpected,
        passengers: req.body.passengers,
        routeID: routeId,
        driverID: driverId,
        busID: busId,
        status: 'Moving',
        trafficStatus: req.body.trafficStatus,
        createdAt: Date.now(),
      },
    });

    if (resp) {
      res.status(201).send({
        Message: 'Journey Started',
        Status: 'Bus Moving..',
        BusInfo: resp,
      });
    }
  } catch (error) {
    res.status(400).send({
      Message: 'An Error Occured!',
      Error: "We couldn't start the journey " + error,
    });
  }
};

//getting all motions in real time, by users
export const getAllJourneys = async (req, res) => {
  try {
    const motions = await journeys.findAll({ where: { status: 'Moving' } });
    res.status(200).json({
      Message: 'All buses in movements retrieved successfully!!',
      Results: motions.length,
      Data: motions,
    });
  } catch (error) {
    res.status(400).send({
      Message: "Sorry, We couldn't retrieve motions at this time.",
    });
  }
};

//get bus simulation/movement info
export const getJourney = async (req, res) => {
  try {
    const id = req.params.journeyId;
    const resp = await journeys.findAll({ where: { journeyId: id } });
    if (resp) {
      res.status(200).send({
        Message: 'Motion Retrieved Successfully!',
        Motion: resp,
      });
    }
  } catch (error) {
    res.status(400).send({
      Message: 'Something went wrong, ' + error,
    });
  }
};

//slowdown bus motion
export const slowDown = async (req, res) => {
  try {
    const id = req.params.journeyId;
    const minimum = 40;
    //find out the current speed
    const journey = await journeys.findAll({ where: { journeyId: id } });
    if (journey[0].speed <= minimum) {
      res.status(400).send({
        Message: 'Minimum speed of ' + minimum + ' km/h reached.',
        Warning: "You can't go below minimum speed",
      });
    } else {
      const decrement = journey[0].speed - 5;

      const resp = await journeys.update(
        { speed: decrement },
        { where: { journeyId: id } }
      );
      if (resp) {
        res.status(200).send({
          Message: 'Motion Slowed Down to ' + decrement + ' km/h !!',
        });
      }
    }
  } catch (error) {
    res.status(400).send({
      Message: 'Something went wrong, ' + error,
    });
  }
};

//speed up bus motion
export const speedUp = async (req, res) => {
  try {
    const id = req.params.journeyId;
    const maximum = 120;
    //find out the current speed
    const journey = await journeys.findAll({ where: { journeyId: id } });
    if (journey[0].speed >= maximum) {
      res.status(400).send({
        Message: 'Maximum speed of ' + maximum + ' km/h reached.',
        Warning: "You can't go above maximum speed",
      });
    } else {
      const increment = journey[0].speed + 5;

      const resp = await journeys.update(
        { speed: increment },
        { where: { journeyId: id } }
      );
      if (resp) {
        res.status(200).send({
          Message: 'Motion speed has increased to ' + increment + ' km/h !!',
        });
      }
    }
  } catch (error) {
    res.status(400).send({
      Message: 'Something went wrong, ' + error,
    });
  }
};

//pause or resume
export const pauseOrResume = async (req, res) => {
  try {
    const id = req.params.journeyId;
    const journey = await journeys.findAll({ where: { journeyId: id } });
    const status = journey[0].status;
    if (status === 'Moving') {
      const updateStatus = await journeys.update(
        { status: 'Paused' },
        { where: { journeyId: id } }
      );
      if (updateStatus) {
        res.status(200).send({
          Message: 'Journey Paused',
        });
      }
    } else if (status === 'Paused') {
      const updateStatus = await journeys.update(
        { status: 'Moving' },
        { where: { journeyId: id } }
      );
      if (updateStatus) {
        res.status(200).send({
          Message: 'Journey Resumed',
        });
      }
    } else if (status === 'Stopped') {
      res.status(400).send({
        Message: "Ended/Cancelled Journey can't be Paused/Resumed.",
      });
    }
  } catch (error) {
    res.status(400).send({
      Message: 'Something went wrong, ' + error,
    });
  }
};

//end or cancel motion
export const stopJourney = async (req, res) => {
  try {
    const id = req.params.journeyId;
    const journey = await journeys.findAll({ where: { journeyId: id } });
    const status = journey[0].status;
    if (status === 'Moving' || status === 'Paused') {
      const updateStatus = await journeys.update(
        { status: 'Stopped' },
        { where: { journeyId: id } }
      );
      if (updateStatus) {
        res.status(200).send({
          Message: 'Journey Stopped',
          Reason: 'Ended/Cancelled',
        });
      }
    } else if (status === 'Stopped') {
      res.status(400).send({
        Message: 'The Journey Already Stopped!.',
      });
    }
  } catch (error) {
    res.status(400).send({
      Message: 'Something went wrong, ' + error,
    });
  }
};

//update/edit journey info
export const editJourneyInfo = async (req, res) => {
  try {
    const id = req.params.journeyId;
    const isUpdated = await journeys.update(
      {
        updatedAt: Date(),
        ...req.body,
      },
      {
        where: { journeyId: id },
      }
    );
    if (isUpdated) {
      res.status(200).send({
        Message: 'Journey Info Updated Successfully!',
      });
    }
  } catch (error) {
    res.status(400).send({
      Message: 'Something went wrong, ' + error,
      Stack: error.stack,
    });
  }
};
