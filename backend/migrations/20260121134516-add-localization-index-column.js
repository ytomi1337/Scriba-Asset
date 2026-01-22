'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('localizations', 'prefix', {
      type: Sequelize.TEXT,
      allowNull: true,
    });


    await queryInterface.sequelize.query(`
      UPDATE localizations
      SET prefix = 'WYK'
      WHERE prefix IS NULL
    `);

    await queryInterface.changeColumn('localizations', 'prefix', {
      type: Sequelize.TEXT,
      allowNull: false,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('localizations', 'prefix');
  }
};
