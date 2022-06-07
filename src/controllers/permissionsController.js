import responseHandler from '../utils/responseHandler';
import model from '../database/models';

const permission = model.permissions;
const addPermission = async (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.description) {
    res.status(400).send({
      message: 'Invalid request! Missing required items!',
    });
    return;
  }

  // Create a PERMISSION

  await permission
    .findOrCreate({
      where: {
        name: req.body.name,
        description: req.body.description,
      },
    })
    .then(([permission, created]) => {
      if (created) responseHandler(res, 200, permission);
      else responseHandler(res, 400, 'Sorry! That permission already exists.');
    })
    .catch((err) => {
      console.log(' 🔥 🔥 🔥 🔥 🔥 🔥 ');
      console.log('-err:', err);
      responseHandler(
        res,
        500,
        err.message || 'Some error occurred while creating the permission.'
      );
    });
};

const findAllPermissions = async (req, res) => {
  try {
    const allPermissions = await permission.findAll();
    return responseHandler(res, 200, {
      allPermissions: allPermissions,
      count: allPermissions.length,
    });
  } catch (err) {
    responseHandler(res, 500, err.message || 'Internal Server Error');
  }
};

const findOnePermission = async (req, res) => {
  try {
    const permissionId = req.params.id;
    const onePermission = await permission.findOne({
      where: { permission_id: permissionId },
    });

    if (!onePermission)
      return responseHandler(
        res,
        404,
        `Permission with id: ${permissionId} does not exists!`
      );
    else return responseHandler(res, 200, onePermission);
  } catch (err) {
    responseHandler(
      res,
      500,
      err.message || 'Some errors occurred while retrieving all permission.'
    );
  }
};

const updatePermission = async (req, res) => {
  try {
    const permissionId = req.params.id;
    const permissionFound = await permission.findOne({
      where: { permission_id: permissionId },
    });

    if (!permissionFound)
      return responseHandler(
        res,
        404,
        `Permission with id: ${permissionId} does not exists!`
      );
    else {
      const permissionUpdates = await permission.update(
        {
          name: req.body.name,
          description: req.body.description,
        },
        {
          where: { permission_id: permissionId },
        }
      );
      return responseHandler(res, 200, {
        message: 'Permission updated successfully!',
      });
    }
  } catch (err) {
    responseHandler(
      res,
      500,
      err.message || 'Some errors occurred while updating the permission.'
    );
  }
};

const deletePermission = async (req, res) => {
  try {
    const permissionId = req.params.id;
    const permissionFound = await permission.findOne({
      where: { permission_id: permissionId },
    });

    if (!permissionFound)
      return responseHandler(
        res,
        404,
        `Permission with id: ${permissionId} does not exists!`
      );
    else {
      await permission.destroy({
        where: { permission_id: permissionId },
      });
      return responseHandler(res, 200, 'Permission deleted successfuully!');
    }
  } catch (err) {
    responseHandler(
      res,
      500,
      err.message || 'Some errors occurred while deleting the permission.'
    );
  }
};

export {
  addPermission,
  findAllPermissions,
  findOnePermission,
  updatePermission,
  deletePermission,
};
