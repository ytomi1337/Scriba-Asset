'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('assets', 'model_id', {
      type: Sequelize.INTEGER, allowNull: true,
      references: { model: 'models', key: 'id' },
      onUpdate: 'CASCADE', onDelete: 'SET NULL'
    });

    await queryInterface.addIndex('assets', ['model_id']);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('assets', 'assets_models_id_fkey');
    await queryInterface.removeIndex('assets', 'assets_models_id');
    await queryInterface.removeColumn('assets', 'models_id');
  }
};
