'use strict';

module.exports = {
  async up(q, S){
    await q.createTable('phones', {
      id:                 { allowNull: false, autoIncrement: true, primaryKey: true, type: S.INTEGER},
      name:               { type: S.STRING,    allowNull: false},
      serial_num:         { type: S.TEXT,      allowNull: false},
      imei:               { type:S.STRING(15), allowNull: true },
      nr_tel:             { type:S.STRING(9),  allowNull: true },            
      puk:                { type:S.STRING(8),  allowNull: true },            
      pin:                { type:S.STRING(4),  allowNull: true },
      stan:               { type: S.STRING,    allowNull: true},         
      recipt_date:        { type: S.DATE,      allowNull: true},
      return_date:        { type: S.DATE,      allowNull: true},
      warranty_date:      { type: S.DATE,      allowNull: true},

      // FK
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

    await q.addIndex('phones', ['status_id']);
    await q.addIndex('phones', ['user_id']);
    await q.addIndex('phones', ['vendor_id']);
  },

  async down (q) {
    await q.dropTable('phones');
  }
}