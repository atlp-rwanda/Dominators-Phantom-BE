import responseHandler from '../utils/responseHandler';
import model from '../database/models';
import slug from 'slug';

const permission = model.permissions;
const addPermission = async (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.description) {
    return responseHandler(res, 400, {
      message: 'Invalid request! Missing required items!',
    });
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
      if (created) responseHandler(res, 201, permission);
      else
        responseHandler(res, 400, {
          message: 'Sorry! That permission already exists.',
        });
    })
    .catch((err) => {
      console.log('-err:', err);
      responseHandler(res, 500, {
        error:
          err.message || 'Some error occurred while creating the permission.',
      });
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
    responseHandler(res, 500, {
      error: err.message || 'Internal Server Error',
    });
  }
};

const findOnePermission = async (req, res) => {
  try {
    const permissionId = req.params.id;
    const onePermission = await permission.findOne({
      where: { permission_id: permissionId },
    });

    if (!onePermission)
      return responseHandler(res, 404, {
        message: `Permission with id: ${permissionId} does not exists!`,
      });
    else return responseHandler(res, 200, onePermission);
  } catch (err) {
    responseHandler(res, 500, {
      error:
        err.message || 'Some errors occurred while retrieving the permission.',
    });
  }
};

const updatePermission = async (req, res) => {
  try {
    const permissionId = req.params.id;
    const permissionFound = await permission.findOne({
      where: { permission_id: permissionId },
    });

    if (!permissionFound)
      return responseHandler(res, 404, {
        message: `Permission with id: ${permissionId} does not exists!`,
      });
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
    responseHandler(res, 500, {
      error:
        err.message || 'Some errors occurred while updating the permission.',
    });
  }
};

const deletePermission = async (req, res) => {
  try {
    const permissionId = req.params.id;
    const permissionFound = await permission.findOne({
      where: { permission_id: permissionId },
    });

    if (!permissionFound)
      return responseHandler(res, 404, {
        message: `Permission with id: ${permissionId} does not exists!`,
      });
    else {
      await permission.destroy({
        where: { permission_id: permissionId },
      });
      return responseHandler(res, 200, {
        message: 'Permission deleted successfully!',
      });
    }
  } catch (err) {
    responseHandler(res, 500, {
      error:
        err.message || 'Some errors occurred while deleting the permission.',
    });
  }
};

export {
  addPermission,
  findAllPermissions,
  findOnePermission,
  updatePermission,
  deletePermission,
};
