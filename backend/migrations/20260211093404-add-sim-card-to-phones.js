'use strict';

module.exports = {
  async up(q, Sequelize) {
    await q.addColumn('phones', 'sim_card_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'sim_cards',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
    await q.addIndex('phones', ['sim_card_id']);
  },

  async down(q) {
    await q.removeColumn('phones', 'sim_card_id');
  },
};
