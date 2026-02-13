'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // await queryInterface.addColumn('models', 'category_id', {
    //   type: Sequelize.INTEGER,
    //   allowNull: true,
    //   references: {
    //     model: 'categories',
    //     key: 'id',
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'RESTRICT',
    // });

    // await queryInterface.sequelize.query(`
    //   UPDATE models
    //   SET category_id = 3
    // `);

    await queryInterface.changeColumn('models', 'category_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.addIndex('models', ['category_id']);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('models', 'category_id')
  }
};
