'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.removeColumn('phones', 'recipt_date')
    // await queryInterface.removeColumn('phones', 'return_date')
    // await queryInterface.removeColumn('phones', 'warranty_date')
    // await queryInterface.removeColumn('phones', 'status_id')
    // await queryInterface.removeColumn('phones', 'user_id')
    // await queryInterface.removeColumn('phones', 'model_id')

    // await queryInterface.addColumn('phones', 'asset_id', {
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    //   unique: true, 
    //   references: {
    //     model: 'assets',
    //     key: 'id',
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'CASCADE',
    // });

    // await queryInterface.addIndex('phones', ['asset_id']);
    // await queryInterface.removeColumn('phones', 'stan')
    // await queryInterface.removeColumn('phones', 'stan')
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('phones', 'stan')
  },
};
