'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const roleId = await queryInterface.sequelize.query(
      `SELECT role_id from roles;`
    )
    const roleIdRows = roleId[0]

    const permissionId = await queryInterface.sequelize.query(
      `SELECT permission_id from permissions;`
    )
    const permissionIdRow = permissionId[0]

    await queryInterface.bulkInsert(
      'role_permissions',
      [
        {
          role_id: roleIdRows[0].role_id,
          permission_id: permissionIdRow[0].permission_id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          role_id: roleIdRows[0].role_id,
          permission_id: permissionIdRow[1].permission_id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          role_id: roleIdRows[0].role_id,
          permission_id: permissionIdRow[2].permission_id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          role_id: roleIdRows[0].role_id,
          permission_id: permissionIdRow[3].permission_id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          role_id: roleIdRows[0].role_id,
          permission_id: permissionIdRow[4].permission_id,
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
