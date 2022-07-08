import model from '../database/models/';
import { draw } from '../helpers/drawCoordinates';
const journeys = model.Journey;
const assign = model.AssignDriver;
const buses = model.Bus;
const routes = model.routes;

//command bus to start moving
export const createJourney = async (req, res) => {
  if (!req.body.JourneyTitle || !req.body.Speed || !req.body.passengers) {
    res.status(400).json({
      Message: 'Oops! All fields required!',
    });
    return null;
  }
  try {
    const currentUser = req.user;
    const driverId = currentUser.id.toString();
    const isAssigned = await assign.findOne({
      where: { UserId: currentUser.id },
    });
    const busId = isAssigned.BusId;
    const busInfo = await buses.findOne({
      where: { id: busId },
    });
    const routeId = busInfo.routeId;
    const routeInfo = await routes.findOne({
      where: { routeId: routeId },
    });

    const point = draw(
      parseFloat(routeInfo.fromCoordinates[0]),
      parseFloat(routeInfo.fromCoordinates[1])
    );
    const resp = await journeys.findOrCreate({
      where: {
        journeyTitle: req.body.JourneyTitle,
        currentLocation: point,
        speed: req.body.Speed,
        passengers: req.body.passengers,
        routeID: routeId,
        driverID: driverId,
        busID: busId,
      },
    });

    if (resp) {
      res.status(201).json({
        Message: 'Journey Started',
        Status: 'Bus Moving..',
        MotionInfo: resp,
      });
    }
  } catch (error) {
    res.status(400).json({
      Message: 'An Error Occured!',
      Error: "We couldn't start the journey " + error,
      StackError: error.stack,
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
    res.status(400).json({
      Message: "Sorry, We couldn't retrieve motions at this time.",
    });
  }
};

//get bus simulation/movement info
export const getJourney = async (req, res) => {
  try {
    const id = req.params.journeyId;
    const resp = await journeys.findOne({ where: { journeyId: id } });
    if (resp) {
      res.status(200).json({
        Message: 'Motion Retrieved Successfully!',
        Motion: resp,
      });
    }
  } catch (error) {
    res.status(400).json({
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
      res.status(400).json({
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
        res.status(200).json({
          Message: 'Motion Slowed Down to ' + decrement + ' km/h !!',
        });
      }
    }
  } catch (error) {
    res.status(400).json({
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
      res.status(400).json({
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
        res.status(200).json({
          Message: 'Motion speed has increased to ' + increment + ' km/h !!',
        });
      }
    }
  } catch (error) {
    res.status(400).json({
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
        res.status(200).json({
          Message: 'Journey Paused',
        });
      }
    } else if (status === 'Paused') {
      const updateStatus = await journeys.update(
        { status: 'Moving' },
        { where: { journeyId: id } }
      );
      if (updateStatus) {
        res.status(200).json({
          Message: 'Journey Resumed',
        });
      }
    } else if (status === 'Stopped') {
      res.status(400).json({
        Message: "Ended/Cancelled Journey can't be Paused/Resumed.",
      });
    }
  } catch (error) {
    res.status(400).json({
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
        res.status(200).json({
          Message: 'Journey Stopped',
          Reason: 'Ended/Cancelled',
        });
      }
    } else if (status === 'Stopped') {
      res.status(400).json({
        Message: 'The Journey Already Stopped!.',
      });
    }
  } catch (error) {
    res.status(400).json({
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
      res.status(200).json({
        Message: 'Journey Info Updated Successfully!',
      });
    }
  } catch (error) {
    res.status(400).json({
      Message: 'Something went wrong, ' + error,
      Stack: error.stack,
    });
  }
};
