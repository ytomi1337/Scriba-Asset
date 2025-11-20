'use strict';

module.exports = {
  async up(q, S){
    await q.removeColumn('assets', 'name')
    
    await q.removeConstraint('assets', 'assets_vendor_id_fkey');
    await q.removeIndex('assets', 'assets_vendor_id');
    await q.removeColumn('assets', 'vendor_id');

    await q.createTable('models', {
      id:                 { allowNull: false, autoIncrement: true, primaryKey: true, type: S.INTEGER},
      name:               { type: S.TEXT, allowNull: false, unique: true},
      createdAt:          { allowNull: false, type: S.DATE, defaultValue: S.literal('now()') },
      updatedAt:          { allowNull: false, type: S.DATE, defaultValue: S.literal('now()') },
      
      //FK
      vendor_id:          { type: S.INTEGER, allowNull: true,
                            references: { model: 'vendors',  key:  'id'  },
                            onUpdate: 'CASCADE', onDelete: 'SET NULL'  },
    });
    await q.addIndex('models', ['vendor_id']);
  },

  async down (q, S) {
    await q.addColumn('assets', 'name', {
      type: S.STRING,
      allowNull: true,
    });

    await q.dropTable('models');
  }
}