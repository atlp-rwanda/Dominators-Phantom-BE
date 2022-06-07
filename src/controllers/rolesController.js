import responseHandler from '../utils/responseHandler';
import model from '../database/models';

const role = model.roles;

const addRole = async (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.description) {
    return responseHandler(res, 400, {
      message: 'Invalid request! Missing required items!',
    });
  }

  // Create a ROLE

  await role
    .findOrCreate({
      where: {
        name: req.body.name,
        description: req.body.description,
      },
    })
    .then(([role, created]) => {
      if (created) responseHandler(res, 200, role);
      else
        responseHandler(res, 400, {
          message: 'Sorry! That role already exists.',
        });
    })
    .catch((err) => {
      console.log('-err:', err);
      responseHandler(res, 500, {
        error: err.message || 'Some error occurred while creating the role.',
      });
    });
};

const findAllRoles = async (req, res) => {
  try {
    const allRoles = await role.findAll();
    return responseHandler(res, 200, {
      allRoles: allRoles,
      count: allRoles.length,
    });
  } catch (err) {
    responseHandler(res, 500, {
      error: err.message || 'Internal Server Error',
    });
  }
};

const findOneRole = async (req, res) => {
  try {
    const roleId = req.params.id;
    const oneRole = await role.findOne({
      where: { role_id: roleId },
    });

    if (!oneRole)
      return responseHandler(res, 404, {
        message: `Role with id: ${roleId} does not exists!`,
      });
    else return responseHandler(res, 200, oneRole);
  } catch (err) {
    responseHandler(res, 500, {
      error: err.message || 'Some errors occurred while retrieving the role.',
    });
  }
};

const updateRole = async (req, res) => {
  try {
    const roleId = req.params.id;
    const roleFound = await role.findOne({
      where: { role_id: roleId },
    });

    if (!roleFound)
      return responseHandler(res, 404, {
        message: `Role with id: ${roleId} does not exists!`,
      });
    else {
      const roleUpdate = await role.update(
        {
          name: req.body.name,
          description: req.body.description,
        },
        {
          where: { role_id: roleId },
        }
      );
      return responseHandler(res, 200, {
        message: 'Role updated successfully!',
      });
    }
  } catch (err) {
    responseHandler(res, 500, {
      error: err.message || 'Some errors occurred while updating the role.',
    });
  }
};

const deleteRole = async (req, res) => {
  try {
    const roleId = req.params.id;
    const roleFound = await role.findOne({
      where: { role_id: roleId },
    });

    if (!roleFound)
      return responseHandler(res, 404, {
        message: `Role with id: ${roleId} does not exists!`,
      });
    else {
      await role.destroy({
        where: { role_id: roleId },
      });
      return responseHandler(res, 200, {
        message: 'Role deleted successfully!',
      });
    }
  } catch (err) {
    responseHandler(res, 500, {
      error: err.message || 'Some errors occurred while deleting the role.',
    });
  }
};

export { addRole, findAllRoles, findOneRole, updateRole, deleteRole };
