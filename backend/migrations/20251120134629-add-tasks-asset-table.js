'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('task_assets', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      task_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'tasks', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      asset_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'assets', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.addIndex('task_assets', ['task_id']);
    await queryInterface.addIndex('task_assets', ['asset_id']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('task_assets');
  }
};
