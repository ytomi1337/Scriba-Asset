'use strict';

module.exports = {
  async up(q, S){

    await q.sequelize.query('CREATE EXTENSION IF NOT EXISTS pgcrypto;');

    await q.createTable('users', {
       id:                 { allowNull: false, primaryKey: true, type: S.UUID, defaultValue: S.literal('gen_random_uuid()')},
       name:               { type: S.TEXT,    allowNull: false},
       email:              { type: S.TEXT,    allowNull: true},
       email_verified:     { type: S.BOOLEAN, allowNull: false, defaultValue: false},
       role:               { type: S.STRING,  allowNull: false},
       provider:           { type: S.STRING,  allowNull: false, defaultValue: 'google'},
       provider_id:        { type: S.TEXT,    allowNull: false, unique: true},
       metadata:           { type: S.JSONB,   allowNull: true},
       is_active:          { type: S.BOOLEAN, allowNull: false, defaultValue: true},
       last_login:         { type: S.DATE,    allowNull: true},
       manager:            { type: S.TEXT,    allowNull: true},
       position:           { type: S.TEXT,    allowNull: false},
       department:         { type: S.TEXT,    allowNull: false},
       holcim_code:        { type: S.STRING(8),    allowNull: false},

       //FK
       localization_id:     { type: S.INTEGER, allowNull: true,
                             references:  { model: 'localizations', key:  'id'  },
                             onUpdate: 'CASCADE', onDelete: 'SET NULL'  },

       createdAt:          { allowNull: false, type: S.DATE, defaultValue: S.literal('now()') },
       updatedAt:          { allowNull: false, type: S.DATE, defaultValue: S.literal('now()') },
    });

    await q.addIndex('users', ['localization_id']);
  },

  async down (q) {
    await q.dropTable('users');
  }
}