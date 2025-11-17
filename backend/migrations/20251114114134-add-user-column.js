'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'status', {
      type: Sequelize.ENUM('invited','active','disabled'),
      allowNull: false,
      defaultValue: 'active',
    });

    await queryInterface.addColumn('users', 'claim_token', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('users', 'claim_token_expires_at', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'claim_token_expires_at');
    await queryInterface.removeColumn('users', 'claim_token');
    await queryInterface.removeColumn('users', 'status');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_users_status";');
  }
};
