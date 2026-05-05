'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TYPE "enum_tasks_type"
      ADD VALUE 'Created';
    `);
  },

  async down(queryInterface, Sequelize) {

  }
};