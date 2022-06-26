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
        },
        {
          role_id: roleIdRows[0].role_id,
          permission_id: permissionIdRow[5].permission_id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          role_id: roleIdRows[0].role_id,
          permission_id: permissionIdRow[6].permission_id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          role_id: roleIdRows[0].role_id,
          permission_id: permissionIdRow[7].permission_id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          role_id: roleIdRows[0].role_id,
          permission_id: permissionIdRow[8].permission_id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          role_id: roleIdRows[0].role_id,
          permission_id: permissionIdRow[9].permission_id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          role_id: roleIdRows[0].role_id,
          permission_id: permissionIdRow[10].permission_id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          role_id: roleIdRows[0].role_id,
          permission_id: permissionIdRow[11].permission_id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          role_id: roleIdRows[0].role_id,
          permission_id: permissionIdRow[12].permission_id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          role_id: roleIdRows[0].role_id,
          permission_id: permissionIdRow[13].permission_id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          role_id: roleIdRows[0].role_id,
          permission_id: permissionIdRow[14].permission_id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          role_id: roleIdRows[0].role_id,
          permission_id: permissionIdRow[15].permission_id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          role_id: roleIdRows[0].role_id,
          permission_id: permissionIdRow[16].permission_id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          role_id: roleIdRows[0].role_id,
          permission_id: permissionIdRow[17].permission_id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          role_id: roleIdRows[0].role_id,
          permission_id: permissionIdRow[18].permission_id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          role_id: roleIdRows[0].role_id,
          permission_id: permissionIdRow[19].permission_id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          role_id: roleIdRows[0].role_id,
          permission_id: permissionIdRow[20].permission_id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          role_id: roleIdRows[0].role_id,
          permission_id: permissionIdRow[21].permission_id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          role_id: roleIdRows[0].role_id,
          permission_id: permissionIdRow[22].permission_id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          role_id: roleIdRows[0].role_id,
          permission_id: permissionIdRow[23].permission_id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          role_id: roleIdRows[0].role_id,
          permission_id: permissionIdRow[24].permission_id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          role_id: roleIdRows[0].role_id,
          permission_id: permissionIdRow[25].permission_id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          role_id: roleIdRows[0].role_id,
          permission_id: permissionIdRow[26].permission_id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          role_id: roleIdRows[0].role_id,
          permission_id: permissionIdRow[27].permission_id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          role_id: roleIdRows[0].role_id,
          permission_id: permissionIdRow[28].permission_id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          role_id: roleIdRows[0].role_id,
          permission_id: permissionIdRow[29].permission_id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          role_id: roleIdRows[0].role_id,
          permission_id: permissionIdRow[30].permission_id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          role_id: roleIdRows[0].role_id,
          permission_id: permissionIdRow[31].permission_id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          role_id: roleIdRows[0].role_id,
          permission_id: permissionIdRow[32].permission_id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          role_id: roleIdRows[0].role_id,
          permission_id: permissionIdRow[33].permission_id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          role_id: roleIdRows[0].role_id,
          permission_id: permissionIdRow[34].permission_id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          role_id: roleIdRows[0].role_id,
          permission_id: permissionIdRow[35].permission_id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          role_id: roleIdRows[0].role_id,
          permission_id: permissionIdRow[36].permission_id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          role_id: roleIdRows[0].role_id,
          permission_id: permissionIdRow[37].permission_id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          role_id: roleIdRows[0].role_id,
          permission_id: permissionIdRow[38].permission_id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          role_id: roleIdRows[0].role_id,
          permission_id: permissionIdRow[39].permission_id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          role_id: roleIdRows[0].role_id,
          permission_id: permissionIdRow[40].permission_id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          role_id: roleIdRows[0].role_id,
          permission_id: permissionIdRow[41].permission_id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          role_id: roleIdRows[0].role_id,
          permission_id: permissionIdRow[42].permission_id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          role_id: roleIdRows[0].role_id,
          permission_id: permissionIdRow[43].permission_id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          role_id: roleIdRows[0].role_id,
          permission_id: permissionIdRow[44].permission_id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('role_permissions', null, {});
  }
};
