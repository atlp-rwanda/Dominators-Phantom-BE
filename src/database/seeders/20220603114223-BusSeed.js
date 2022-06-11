'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Buses', [
      {
        id:"4d100fe5-2bed-41a1-a8cf-83749986f686",
        routeId: '02e7eadd-0e17-47fe-aa0c-553ce1545682',
        prateNumber: 'RAB309',
        busType: 'YUTONGO',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Buses', null, {});
  },
};
