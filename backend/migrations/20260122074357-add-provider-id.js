'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'provider_id', {
          type: Sequelize.TEXT,
          allowNull: true,
        });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'provider_id');
  }
};
