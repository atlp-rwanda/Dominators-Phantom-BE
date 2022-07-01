'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const routeId = await queryInterface.sequelize.query(
      `SELECT "routeId" from routes;`
    )
    const routeIdRows = routeId[0]
    
    await queryInterface.bulkInsert('Buses', [
      {
        routeId: routeIdRows[0].routeId,
        prateNumber: 'RAB309',
        busType: 'YUTONGO',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Buses', null, {});
  },
};
// 20220603114223-BusSeed
