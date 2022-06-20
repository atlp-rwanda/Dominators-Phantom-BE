import responseHandler from '../utils/responseHandler';
import model from '../database/models';

const rolePermission = model.role_permissions;
const permission = model.permissions;
const role = model.roles;

const assignPermissionToRole = async (req, res) => {
  const roleId = req.params.roleId;
  const permissionId = req.body.permission_id;

  // validate request
  if (!roleId || !permissionId) {
    return responseHandler(res, 400, {
      message: 'Invalid request! Missing required items!',
    });
  }

  // check if role exists in DB
  const roleFound = await role.findOne({
    where: {
      role_id: roleId,
    },
  });
  if (!roleFound) {
    return responseHandler(res, 404, {
      message: 'Role is not found!',
    });
  }

  // check if permission exists in DB
  const permissionFound = await permission.findOne({
    where: {
      permission_id: permissionId,
    },
  });
  if (!permissionFound) {
    return responseHandler(res, 404, {
      message: 'Permission is not found!',
    });
  }

  // Assign PERMISSION to a ROLE
  await rolePermission
    .findOrCreate({
      where: {
        role_id: roleId,
        permission_id: permissionId,
      },
    })
    .then(([role_permission, created]) => {
      if (created)
        responseHandler(res, 201, {
          message: 'Permission has been added to the role successfull!',
        });
      else
        responseHandler(res, 400, {
          message:
            'Sorry! That permission already exists on that particular role.',
        });
    })
    .catch((err) => {
      console.log('-err:', err);
      responseHandler(res, 500, {
        error:
          err.message ||
          'Some error occurred while assigning a permission to a role.',
      });
    });
};

const findAllPermissionOnRole = async (req, res) => {
  try {
    const roleId = req.params.roleId;
    let permissionOnRole = [];
    const allPermissionOnRole = await rolePermission.findAll({
      where: {
        role_id: roleId,
      },
    });
    for (let i = 0; i < allPermissionOnRole.length; i++) {
      permissionOnRole.push(
        await permission.findOne({
          where: {
            permission_id: allPermissionOnRole[i].permission_id,
          },
        })
      );
    }

    return responseHandler(res, 200, {
      permissions: permissionOnRole,
      count: allPermissionOnRole.length,
    });
  } catch (err) {
    responseHandler(res, 500, {
      error: err.message || 'Internal Server Error',
    });
  }
};

const findOnePermissionOnRole = async (req, res) => {
  try {
    const roleId = req.params.roleId;
    const permissionId = req.params.permissionId;
    const permissionIDOnRole = await rolePermission.findOne({
      where: {
        role_id: roleId,
        permission_id: permissionId,
      },
    });

    if (!permissionIDOnRole) {
      return responseHandler(res, 404, {
        message: 'Permission on the role does not exist!',
      });
    } else {
      const onePermissionOnRole = await permission.findOne({
        where: {
          permission_id: permissionId,
        },
      });
      if (!onePermissionOnRole)
        return responseHandler(res, 404, {
          message: `Permission with that ID does not exist!`,
        });
      else
        return responseHandler(res, 200, {
          permissionOnRole: onePermissionOnRole,
        });
    }
  } catch (err) {
    responseHandler(res, 500, {
      error:
        err.message ||
        'Some errors occurred while retrieving the permission on specified role.',
    });
  }
};

const removeOnePermissionOnRole = async (req, res) => {
  try {
    const roleId = req.params.roleId;
    const permissionId = req.params.permissionId;
    const permissionIDOnRole = await rolePermission.findOne({
      where: {
        role_id: roleId,
        permission_id: permissionId,
      },
    });
    if (!permissionIDOnRole) {
      return responseHandler(res, 404, {
        message: 'Sorry, either of IDs does not exists',
      });
    } else {
      await rolePermission.destroy({
        where: {
          role_id: roleId,
          permission_id: permissionId,
        },
      });
      return responseHandler(res, 200, {
        message: 'Permission on the Role has been deleted successfully!',
      });
    }
  } catch (err) {
    responseHandler(res, 500, {
      error:
        err.message ||
        'Some errors occurred while retrieving the permission on specified role.',
    });
  }
};

const removeAllPermissionOnRole = async (req, res) => {
  try {
    const roleId = req.params.roleId;
    const roleAssigned = await rolePermission.findAll({
      where: {
        role_id: roleId,
      },
    });
    if (!roleAssigned) {
      return responseHandler(res, 404, {
        message: 'Role is not assigned any permission!',
      });
    } else {
      await role
        .destroy({
          where: {},
          truncate: false,
        })
        .then((nums) => {
          responseHandler(res, 200, {
            message: `${nums} Permission were removed from the role successfully!`,
          });
        })
        .catch((err) => {
          res.status(500);
        });
    }
  } catch (error) {}
};

export {
  assignPermissionToRole,
  findAllPermissionOnRole,
  findOnePermissionOnRole,
  removeOnePermissionOnRole,
  removeAllPermissionOnRole
};
