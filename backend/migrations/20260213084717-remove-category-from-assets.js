'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.removeColumn('assets', 'category_id');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('assets', 'category_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    await queryInterface.addIndex('assets', ['category_id']);
    
  },
  
};