'use strict';

module.exports = {
  async up(q, S){
    await q.createTable('vendors', {
       id:                 { allowNull: false, autoIncrement: true, primaryKey: true, type: S.INTEGER},
       name:               { type: S.TEXT, allowNull: false, unique: true},
       address:            { type: S.TEXT, allowNull: true},
       createdAt:          { allowNull: false, type: S.DATE, defaultValue: S.literal('now()') },
       updatedAt:          { allowNull: false, type: S.DATE, defaultValue: S.literal('now()') },
    });
  },

  async down (q) {
    await q.dropTable('vendors');
  }
}