'use strict';

module.exports = {
  async up(q, S){
    await q.createTable('assets', {
       id:                 { allowNull: false, autoIncrement: true, primaryKey: true, type: S.INTEGER},
       name:               { type: S.STRING, allowNull: false},
       it_num:             { type: S.STRING, allowNull: false, unique: true},
       serial_num:         { type: S.STRING, allowNull: false, unique: true},
       note:               { type: S.TEXT, allowNull: true},
       recipt_date:        { type: S.DATE, allowNull: true},
       return_date:        { type: S.DATE, allowNull: true},
       warranty_date:      { type: S.DATE, allowNull: true},

      // FK
      category_id:          { type: S.INTEGER, allowNull: true,
                             references: { model: 'categories', key: 'id'  },
                             onUpdate: 'CASCADE', onDelete: 'SET NULL' },
      license_id:           { type: S.INTEGER, allowNull: true,
                             references: { model: 'licenses',  key:  'id'  },
                             onUpdate: 'CASCADE', onDelete: 'SET NULL'  },
      status_id:            { type: S.INTEGER, allowNull: true,
                             references: { model: 'statuses',  key:  'id'  },
                             onUpdate: 'CASCADE', onDelete: 'SET NULL'  },
      user_id:              { type: S.UUID, allowNull: true,
                             references: { model: 'users',  key:  'id'  },
                             onUpdate: 'CASCADE', onDelete: 'SET NULL'  },
      vendor_id:            { type: S.INTEGER, allowNull: true,
                             references: { model: 'vendors',  key:  'id'  },
                             onUpdate: 'CASCADE', onDelete: 'SET NULL'  },

      createdAt:           { allowNull: false, type: S.DATE, defaultValue: S.literal('now()') },
      updatedAt:           { allowNull: false, type: S.DATE, defaultValue: S.literal('now()') },
    });

    await q.addIndex('assets', ['category_id']);
    await q.addIndex('assets', ['license_id']);
    await q.addIndex('assets', ['status_id']);
    await q.addIndex('assets', ['user_id']);
    await q.addIndex('assets', ['vendor_id']);
  },

  async down (q) {
    await q.dropTable('assets');
  }
}