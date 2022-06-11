import responseHandler from '../utils/responseHandler';
import model from '../database/models';

const rolePermission = model.role_permissions;
const permission = model.permissions;

const assignPermissionToRole = async (req, res) => {
  const roleId = req.params.roleId;
  if (!roleId) {
    return responseHandler(res, 404, {
      message: 'Role with that is not found!',
    });
  }

  // Validate request
  if (!req.body.permission_id) {
    return responseHandler(res, 400, {
      message: 'Invalid request! Missing required items!',
    });
  }

  // Assign PERMISSION to a ROLE
  await rolePermission
    .findOrCreate({
      where: {
        role_id: roleId,
        permission_id: req.body.permission_id,
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
    console.log('ON 🔥ON 🔥ON 🔥ON 🔥');
    console.log(permissionIDOnRole);
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

export {
  assignPermissionToRole,
  findAllPermissionOnRole,
  findOnePermissionOnRole,
  removeOnePermissionOnRole,
};
