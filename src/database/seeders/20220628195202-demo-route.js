'use strict';
import { draw } from '../../helpers/drawCoordinates';
import slug from 'slug';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'routes',
      [
        {
          origin: 'Kigali',
          destination: 'Huye',
          distance: '200km',
          routeSlug: slug('Kigali'),
          code: '303',
          fromCoordinates: draw(1.234567, 32.03456),
          toCoordinates: draw(10.234567, 32.05556),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('routes', null, {});
  },
};
