import model from '../database/models';
import responseHandler from '../utils/responseHandler';

const role = model.roles;
const rolePermission = model.role_permissions;
const permission = model.permissions;

exports.checkPermission = async (req, res, next) => {
  const currentRole = req.user.role;
  console.log('>>>>>current role: ', currentRole);

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
      console.log(urlComp)
      console.log('<<<<<<<<', urlComp[3]);

      const target = urlComp[3];
      const action = req.method;
      const requiredPermission = allPermissions[target][action.toLowerCase()];
      console.log('<<<<<<<<<Required permission: ', requiredPermission);

      let permissionDB = []
      const db = await permission.findAll();
      for (let i = 0; i < db.length; i++) {
        permissionDB.push(db[i].name)
      }
      console.log(permissionDB);

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

// Retrieve permissions in the Database
const allPermissions = {
  users: {
    post: 'add user',
    get: 'get all users',
    get: 'get one user',
    update: 'update user',
    delete: 'delete user'
  },
  roles: {
    post: 'add role',
    get: 'get one role',
    get: 'get one permission on role',
    get: 'get all permissions on role',
    get: 'get all roles',
    update: 'uptate role',
    delete: 'delete role',
    post: 'add permission on role',
    delete: 'delete permission on role'
  },
  routes: {
    post: 'add route',
    get: 'get all routes',
    get: 'get one route',
    update: 'update route',
    delete: 'delete route'
  },
  buses: {
    post: 'add bus',
    get: 'get all buses',
    get: 'get one bus',
    update: 'update bus',
    delete: 'delete bus'
  },
  permissions: {
    post: 'add permission',
    get: 'get one permission',
    get: 'get all permissions',
    update: 'update permission',
    delete: 'delete permission'
  }
};
