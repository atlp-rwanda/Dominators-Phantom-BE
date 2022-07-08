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
          name: 'operator',
          description: 'manages all drivers in the company',
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