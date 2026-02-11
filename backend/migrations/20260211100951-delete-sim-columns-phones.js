'use strict';

module.exports = {
  async up (q, Sequelize) {
    await q.removeColumn('phones', 'nr_tel');
    await q.removeColumn('phones', 'puk');
    await q.removeColumn('phones', 'pin');
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
