import model from '../database/models';
import responseHandler from '../utils/responseHandler';

const role = model.roles;
const rolePermission = model.role_permissions;
const permission = model.permissions;

exports.checkPermission = async (req, res, next) => {
  const currentRole = req.user.role;

  try {
    let permissionOnRole = [];
    const roleFound = await role.findOne({
      where: {
        name: currentRole,
      },
    });

    if (!roleFound)
      return responseHandler(res, 404, { message: 'Role not found!' });
    else {
      const allPermissionOnRole = await rolePermission.findAll({
        where: {
          role_id: roleFound.role_id,
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

      const urlComp = req.originalUrl.split('/');

      const target = urlComp[3];
      const action = req.method
      const usedAction = req.params.id
        ? `${action.toLowerCase()}One`
        : req.params.permissionId && req.params.roleId
        ? `${action.toLowerCase()}OnePermission`
        : req.params.roleId
        ? `${action.toLowerCase()}Permissions`
        : action.toLowerCase()

      const requiredPermission = allPermissions[target][usedAction];

      let permissionDB = []
      const db = await permission.findAll();
      for (let i = 0; i < db.length; i++) {
        permissionDB.push(db[i].name)
      }

      let permissionNames = [];
      for (let i = 0; i < permissionOnRole.length; i++) {
        permissionNames.push(permissionOnRole[i].name);
      }
      if (!permissionNames.includes(requiredPermission))
        return responseHandler(res, 403, {
          message: 'You do not have this permission!',
        });
    }
  } catch (err) {
    responseHandler(res, 500, {
      error: err.message || 'Internal Server Error',
    });
  }

  next();
};

// Permissions on API routes
const allPermissions = {
  users: {
    post: 'add user',
    get: 'get all users',
    getOne: 'get one user',
    patchOne: 'update user',
    deleteOne: 'delete user'
  },
  roles: {
    post: 'add role',
    getOne: 'get one role',
    getOnePermission: 'get one permission on role',
    getPermissions: 'get all permissions on role',
    get: 'get all roles',
    patchOne: 'update role',
    deleteOne: 'delete role',
    delete: 'delete many roles',
    postPermissions: 'add permission on role',
    deleteOnePermission: 'delete permission on role',
    deletePermissions: 'delete many permissions on role'
  },
  routes: {
    post: 'add route',
    get: 'get all routes',
    getOne: 'get one route',
    patchOne: 'update route',
    deleteOne: 'delete route',
    delete: 'delete many routes'
  },
  buses: {
    post: 'add bus',
    get: 'get all buses',
    getOne: 'get one bus',
    patchOne: 'update bus',
    deleteOne: 'delete bus',
    delete: 'delete many buses'
  },
  permissions: {
    post: 'add permission',
    getOne: 'get one permission',
    get: 'get all permissions',
    patchOne: 'update permission',
    deleteOne: 'delete permission',
    delete: 'delete many permissions'
  },
  assign: {
    post: 'add driver on bus',
    get: 'get all drivers on bus',
    getOne: 'get one assigned driver',
    patchOne: 'update one assigned driver',
    deleteOne: 'unassign driver',
  }, 
  unassign: {
    get: 'get all unassigned drivers'
  },
  journey: {
    post: 'add journey',
    get: 'get all journeys',
    getOne: 'get one journey',
    patchOne: 'update one journey',
    deleteOne: 'delete journey',
  }
};
