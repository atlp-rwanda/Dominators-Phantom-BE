'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'user',
      [
        {
          id: 1,
          name: 'user1',
          username: 'username1',
          email: 'user1@test.com',
          password: Math.floor(Math.random() * 100),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: 'user2',
          username: 'username2',
          email: 'user2@test.com',
          password: Math.floor(Math.random() * 100),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          name: 'user3',
          username: 'username3',
          email: 'user3@test.com',
          password: Math.floor(Math.random() * 100),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user', null, {});
  }
};
