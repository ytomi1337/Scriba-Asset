'use strict';

module.exports = {
  async up(q, S){
    await q.createTable('licenses', {
       id:                   { allowNull: false, autoIncrement: true, primaryKey: true, type: S.INTEGER},
       name:                 { type: S.TEXT, allowNull: false },
       license_key:          { type: S.TEXT, allowNull: false, unique: true},
       license_type:         { type: S.STRING, allowNull: false },
       note:                 { type: S.TEXT, allowNull: true  },
       purchase_price:       { type: S.STRING, allowNull: true  },
       purchase_date:        { type: S.TEXT, allowNull: true  },
       status:               { type: S.STRING, allowNull: true  },
       seats:                { type: S.INTEGER, allowNull: true  },
       valid_from:           { type: S.DATE, allowNull: true  },
       valid_to:             { type: S.DATE, allowNull: true  },
       created_by:           { type: S.DATE, allowNull: true  },

      // FK
      vendor_id:            { type: S.INTEGER, allowNull: true,
                             references: { model: 'vendors', key: 'id'  },
                             onUpdate: 'CASCADE', onDelete: 'SET NULL' },
      user_id:              { type: S.UUID, allowNull: true,
                             references: { model: 'users',  key:  'id'  },
                             onUpdate: 'CASCADE', onDelete: 'SET NULL'  },

      createdAt:           { allowNull: false, type: S.DATE, defaultValue: S.literal('now()') },
      updatedAt:           { allowNull: false, type: S.DATE, defaultValue: S.literal('now()') },
    });

    await q.addIndex('licenses', ['vendor_id']);
    await q.addIndex('licenses', ['user_id']);
  },

  async down (q) {
    await q.dropTable('licenses');
  }
}