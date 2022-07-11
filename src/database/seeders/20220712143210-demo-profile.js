'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query(
      `SELECT * from "Users";`
    );
    const userId = users[0];
    await queryInterface.bulkInsert(
      'Profiles',
      [
        {
          userId: userId[0].id,
          firstName: userId[0].firstName,
          lastName: userId[0].lastName,
          profilePic:
            'http://res.cloudinary.com/drpezmjt1/image/upload/v1657295578/ajgnwrfuledutoksmszs.jpg',
          email: userId[0].email,
          role: userId[0].role,
          bio: 'Good bio is here.',
          nationalId: '345678908736254',
          category: 'D',
          gender: 'male',
          phone: 250,
          province: 'Kigali',
          district: 'Gasabo',
          sector: 'Kinyinya',
          cell: 'Biryogo',
          village: 'Biryogo',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: userId[1].id,
          firstName: userId[1].firstName,
          lastName: userId[1].lastName,
          profilePic:
            'http://res.cloudinary.com/drpezmjt1/image/upload/v1657295578/ajgnwrfuledutoksmszs.jpg',
          email: userId[1].email,
          role: userId[1].role,
          bio: 'Good bio is here.',
          nationalId: '345678908736254',
          category: 'D',
          gender: 'male',
          province: 'Kigali',
          district: 'Gasabo',
          sector: 'Kinyinya',
          cell: 'Biryogo',
          village: 'Biryogo',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: userId[2].id,
          firstName: userId[2].firstName,
          lastName: userId[2].lastName,
          profilePic:
            'http://res.cloudinary.com/drpezmjt1/image/upload/v1657295578/ajgnwrfuledutoksmszs.jpg',
          email: userId[2].email,
          role: userId[2].role,
          bio: 'Good bio is here.',
          nationalId: '345678908736254',
          category: 'D',
          gender: 'male',
          province: 'Kigali',
          district: 'Gasabo',
          sector: 'Kinyinya',
          cell: 'Biryogo',
          village: 'Biryogo',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Profiles', null, {});
  },
};
