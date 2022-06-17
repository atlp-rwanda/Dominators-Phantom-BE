'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'permissions',
      [
        {
          // permission_id: '74d00ea4-497d-41f0-ab99-fb8884520cbe',
          name: 'add user',
          description: 'adding a new user previledge',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          // permission_id: '8acbf6a3-a2cd-4f54-ade3-13fce7c5c571',
          name: 'add role',
          description: 'adding a new role previledge',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          // permission_id: 'b48ad3a5-3fd9-4295-b896-f29e0a6d7024',
          name: 'add permission',
          description: 'adding a new permission previledge',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          // permission_id: 'a79d3a4e-00a6-40af-9c07-235d1267d4d4',
          name: 'add permission on role',
          description: 'adding a permission on role previledge',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          // permission_id: '54762a9e-e9e4-43b9-9e04-031261323bf8',
          name: 'get all roles',
          description: 'getting all roles previledge',
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
