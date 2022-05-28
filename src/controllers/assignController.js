import model from '../database/models';
import { getPagination, getPagingData } from '../utils/paginationHandler';
import responseHandler from '../utils/responseHandler';

const AssignDriver = model.AssignDriver;
const User = model.User;
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
    ],
  }).then((data) => {
    const response = getPagingData(data, page, limit);
    res.status(200).json({ data: response });
  });
};
const getAllDriverUnAssigned = async (req, res) => {
  const { page, size } = req.query;
  console.log(req.query);
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
  if ((!req.body.userId, req.body.BuseId))
    return responseHandler(res, 400, req.t('missing_params'));
  AssignDriver.findOrCreate({
    where: {
      UserId: req.body.userId,
    },
    BusId: req.body.buseId,
  }).then((created) => {
    created[1]
      ? responseHandler(res, 200, req.t('driver_to_buses_create'), req)
      : responseHandler(res, 401, req.t('driver_has_assigned_exit'), req);
  });
};

const findOneAssign = async (req, res) => {
  const AssignedId = req.params.id;
  await AssignDriver.findOne({
    where: {
      id: AssignedId,
    },
    include: [
      {
        model: model.User,
        as: 'Users',
      },
    ],
  }).then((data) => {
    null != data
      ? res.send(data)
      : responseHandler(res, 404, req.t('not_found'), req);
  });
};
const UpdateOneAssign = async (req, res) => {
  const AssignedId = req.params.id;
  try {
    await AssignDriver.update(
      {
        UserId: req.body.userId,
      },
      {
        where: { id: AssignedId },
      }
    ).then((result) => {
      result.length > 0 && responseHandler(res, 201, req.t('updated_ok'), req);
    });
  } catch (error) {
    res.status(401).json({error:error.message})
    
  }
  
};
export {
  getAllDriverAssignToBuses,
  PostAssignDriverToBuses,
  getAllDriverUnAssigned,
  findOneAssign,
  UpdateOneAssign,
};
