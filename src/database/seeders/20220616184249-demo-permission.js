'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'permissions',
      [
        {
          name: 'add user',
          description: 'adding a new user previledge',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'add role',
          description: 'adding a new role previledge',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'add permission',
          description: 'adding a new permission previledge',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'add permission on role',
          description: 'adding a permission on role previledge',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'get all roles',
          description: 'getting all roles previledge',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'get all permissions',
          description: 'getting all permissions previledge',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'get all users',
          description: 'getting all users previledge',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'get one user',
          description: 'getting one user previledge',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'update user',
          description: 'updating user previledge',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'delete user',
          description: 'deleting user previledge',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'get one role',
          description: 'get one role previledge',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'get one permission on role',
          description: 'getting one permission on role previledge',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'get all permissions on role',
          description: 'getting all permissions on role previledge',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'update role',
          description: 'update role previledge',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'delete role',
          description: 'deleting role previledge',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'delete many roles',
          description: 'deleting many roles previledge',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'delete permission on role',
          description: 'deleting permission on role previledge',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'delete many permissions on role',
          description: 'deleting many permissions on role previledge',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'add route',
          description: 'adding route previledge',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'get all routes',
          description: 'getting all routes previledge',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'get one route',
          description: 'geting one route previledge',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'updating route',
          description: 'deleting many permissions on role previledge',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'delete route',
          description: 'deleting route previledge',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'delete many routes',
          description: 'deleting many routes previledge',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'add bus',
          description: 'adding bus previledge',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'get all buses',
          description: 'getting all buses previledge',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'get one bus',
          description: 'getting one bus previledge',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'update bus',
          description: 'updating bus previledge',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'delete bus',
          description: 'deleting bus previledge',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'delete many buses',
          description: 'deleting many buses previledge',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'get one permission',
          description: 'getting one permission previledge',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'update permission',
          description: 'updating permission previledge',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'delete permission',
          description: 'deleting permission previledge',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'delete many permissions',
          description: 'deleting many permissions previledge',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'add driver on bus',
          description: 'adding driver on bus previledge',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'get all drivers on bus',
          description: 'getting all drivers on bus previledge',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'get one assigned driver',
          description: 'getting one assigned driverpreviledge',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'update one assigned driver',
          description: 'updating one assigned driver previledge',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'unassign driver',
          description: 'unassigning driver previledge',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'get all unassigned drivers',
          description: 'getting all unassigned drivers previledge',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'add journey',
          description: 'adding journey previledge',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'get all journeys',
          description: 'getting all journeys previledge',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'get one journey',
          description: 'getting one journey previledge',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'update one journey',
          description: 'updating one journey previledge',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'delete journey',
          description: 'deleting journey previledge',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('permissions', null, {});
  }
};
