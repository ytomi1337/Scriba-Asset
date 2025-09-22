'use strict';

module.exports = {
  async up(q, S){
    await q.createTable('statuses', {
       id:                 { allowNull: false, autoIncrement: true, primaryKey: true, type: S.INTEGER},
       name:               { type: S.STRING(255), allowNull: false, unique: true},
       createdAt:          { allowNull: false, type: S.DATE, defaultValue: S.literal('now()') },
       updatedAt:          { allowNull: false, type: S.DATE, defaultValue: S.literal('now()') },
    });
  },

  async down (q) {
    await q.dropTable('statuses');
  }
}