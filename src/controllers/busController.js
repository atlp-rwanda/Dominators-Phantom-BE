import responseHandler from '../utils/responseHandler';
import model from '../database/models';

const buses = model.Bus;
const addBus = async (req, res) => {
  // Validate request
  if (!req.body.prateNumber || !req.body.routeId || !req.body.busType) {
    res.status(400).send({
      message: 'Invalid request! Missing required items!',
    });
    return;
  }

  // // Create a ROUTE

  await buses
    .findOrCreate({
      where: {
        prateNumber: req.body.prateNumber,
        routeId: req.body.routeId,
        busType: req.body.busType,
      },
    })
    .then(([bus, created]) => {
      if (created) responseHandler(res, 200, bus);
      else responseHandler(res, 400, 'Bus already exists.', req);
    })

    .catch((err) => {
      console.log('-err:', err);

      responseHandler(
        res,
        500,
        err.message || 'Some error occurred while creating the route.',
        req
      );
    });
};

const findAll = async (req, res) => {
  res.json(res.paginatedResults);
};

const findOne = async (req, res) => {
  const { id } = req.params;

  await buses
    .findAll({
      where: { id: id },
    })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Bus with id=${id}.`,
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: `Error retrieving Bus with id=${id}`,
      });
    });
};

const updateBus = async (req, res) => {
  const { id } = req.params;
  console.log('id:', id);
  await buses
    .update(req.body, {
      where: { id: id },
    })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: 'Bus was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update Bus with prateNumber=${id}. Maybe Bus was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating Bus with id=${id}`,
        developer_message: err,
      });
    });
};

const removeBus = async (req, res) => {
  const { id } = req.params;

  await buses
    .destroy({
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Bus was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete Bus with id=${id}. Maybe Bus was not found!`,
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: `Could not delete Bus with id=${id}`,
      });
    });
};

const deleteAll = async (req, res) => {
  await buses
    .destroy({
      where: {},
      truncate: false,
    })
    .then((nums) => {
      res.send({ message: `${nums} Buses were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500);
    });
};

export { addBus, findAll, findOne, updateBus, removeBus, deleteAll };