'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'role_permissions',
      [
        {
          role_id: 'afc1def7-ba7d-4ada-a680-a31a67be0597',
          permission_id: '74d00ea4-497d-41f0-ab99-fb8884520cbe',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          role_id: 'afc1def7-ba7d-4ada-a680-a31a67be0597',
          permission_id: '8acbf6a3-a2cd-4f54-ade3-13fce7c5c571',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          role_id: 'afc1def7-ba7d-4ada-a680-a31a67be0597',
          permission_id: 'b48ad3a5-3fd9-4295-b896-f29e0a6d7024',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          role_id: 'afc1def7-ba7d-4ada-a680-a31a67be0597',
          permission_id: 'a79d3a4e-00a6-40af-9c07-235d1267d4d4',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          role_id: 'afc1def7-ba7d-4ada-a680-a31a67be0597',
          permission_id: '54762a9e-e9e4-43b9-9e04-031261323bf8',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('role_permissions', null, {});
  }
};
