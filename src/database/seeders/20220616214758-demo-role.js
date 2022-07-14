'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'roles',
      [
        {
          name: 'admin',
          description: 'the center of everthing carried on the app',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          // role_id: 'afc1def7-ba7d-4ada-a680-a31a67be0597',
          name: 'operator',
          description: 'the one will manager Drivers',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          // role_id: 'afc1def7-ba7d-4ada-a680-a31a67be0597',
          name: 'driver',
          description: 'the center of everthing carried on the app',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  }
};