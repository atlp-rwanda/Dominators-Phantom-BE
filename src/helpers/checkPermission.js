import model from '../database/models';
import responseHandler from '../utils/responseHandler'; //CHENAGE THE URC naming LINE 9

const role = model.roles;
const rolePermission = model.role_permissions;
const permission = model.permissions;

exports.checkPermission = async (req, res, next) => {
  const currentRole = req.user.role;
  console.log('>>>>>....', currentRole);

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

      const response = {
        role_id: roleFound.role_id,
        name: roleFound.name,
        description: roleFound.description,
        createdAt: roleFound.createdAt,
        updatedAt: roleFound.updatedAt,
        permissions: permissionOnRole,
      };

      const urlComp = req.originalUrl.split('/');
      console.log('<<<<<<<<', urlComp[urlComp.length - 1]);

      const target = urlComp[urlComp.length - 1];
      const action = req.method;
      const requiredPermission = allPermissions[target][action.toLowerCase()]
      console.log("<<<<<<<<<", requiredPermission)

      let permissionNames = []
      for (let i = 0; i < permissionOnRole.length; i++) {
        permissionNames.push(permissionOnRole[i].name)
      }
      if(!permissionNames.includes(requiredPermission)) return responseHandler(res, 403, {message: 'You do not have this permission!'})
    }
  } catch (err) {
    responseHandler(res, 500, {
      error: err.message || 'Internal Server Error',
    });
  }

  next();
};

const allPermissions = {
  users: {
    post: 'add user',
    get: 'get all users'
  },
  roles: {
    post: 'add role',
    get: 'get all roles'
  }
};
