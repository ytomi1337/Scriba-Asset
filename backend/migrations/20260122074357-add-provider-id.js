'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'stock_user', {
          type: Sequelize.Boolean,
          allowNull: true,
        });
    await queryInterface.sequelize.query(`
      UPDATE users
      SET stock_user = false
    `);
    await queryInterface.changeColumn('users', 'stock_user', {
      type: Sequelize.Boolean,
      allowNull: false,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'stock_user');
  }
};
