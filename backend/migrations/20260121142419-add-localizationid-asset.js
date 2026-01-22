'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.addColumn('assets', 'localization_id', {
    //   type: Sequelize.INTEGER,
    //   allowNull: true,
    //   references: {
    //     model: 'localizations',
    //     key: 'id',
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'SET NULL',
    // });

    // await queryInterface.addIndex('assets', ['localization_id']);

    await queryInterface.addColumn('assets', 'sequence', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('assets', 'localization_id');
    await queryInterface.removeColumn('assets', 'sequence');
    
  }
};
