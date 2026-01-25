'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('localizations', 'stock_user_id', {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    await queryInterface.addIndex('localizations', ['stock_user_id']);
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('localizations', 'stock_user_id');
  }
};