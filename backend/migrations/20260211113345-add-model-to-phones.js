'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('phones', 'name');
    await queryInterface.removeColumn('phones', 'vendor_id');
    
    await queryInterface.addColumn('phones', 'model_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'models',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    await queryInterface.addIndex('phones', ['model_id']);
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('phones', 'model_id');
  },
};
