'use strict';

module.exports = {
  async up (q, S) {
    await q.createTable('sim_cards', {
      id:            { type: S.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      nr:            { type: S.STRING(9), allowNull: false, unique: true},
      pin:           { type: S.STRING(4), allowNull: true },
      puk:           { type: S.STRING(8), allowNull: true },
      recipt_date:   { type: S.DATE,      allowNull: true},
      return_date:   { type: S.DATE,      allowNull: true},

      //FK
      localization_id:      { type: S.INTEGER, allowNull: false,
                             references: { model: 'localizations',  key:  'id'  },
                             onUpdate: 'CASCADE', onDelete: 'SET NULL'  },
      user_id:              { type: S.UUID, allowNull: false,
                             references: { model: 'users',  key:  'id'  },
                             onUpdate: 'CASCADE', onDelete: 'SET NULL'  },
      
      createdAt:           { allowNull: false, type: S.DATE, defaultValue: S.literal('now()') },
      updatedAt:           { allowNull: false, type: S.DATE, defaultValue: S.literal('now()') },                                         
    })
    await q.addIndex('sim_cards', ['localization_id']);
    await q.addIndex('sim_cards', ['user_id']);
  },

  async down (q) {
    await q.dropTable('sim_cards');
  }
};
