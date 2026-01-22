'use strict';

module.exports = {
  async up(q, S){
    await q.createTable('localizations', {
       id:                 { allowNull: false, autoIncrement: true, primaryKey: true, type: S.INTEGER, unique: true},
       name:               { type: S.TEXT, allowNull: false},
       prefix:             { type: S.STRING, allowNull: false},
       country:            { type: S.STRING, allowNull: true},
       company_code:       { type: S.STRING(8), allowNull: true, unique: true},
       createdAt:          { allowNull: false, type: S.DATE, defaultValue: S.literal('now()') },
       updatedAt:          { allowNull: false, type: S.DATE, defaultValue: S.literal('now()') },
    });
  },

  async down (q) {
    await q.dropTable('localizations');
  }
}