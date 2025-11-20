'use strict';

module.exports = {
  async up(q, S){

    await q.createTable('tasks', {
       id:                 { allowNull: false, primaryKey: true, type: S.UUID, defaultValue: S.literal('gen_random_uuid()')},
       status:             { type: S.ENUM('Pending', 'Accepted', 'Rejected', 'Cancelled', 'Finished'), defaultValue: 'Pending',   allowNull: false},
       type:               { type: S.ENUM('Assign', 'Return', 'User Transfer', 'Other'), allowNull: true },
       file:               { type: S.STRING,  allowNull: true},
       expires_date:       { type: S.DATE,    allowNull: true},
       confirmed_at:       { type: S.DATE,    allowNull: true},
       created_at:         { type: S.DATE,    allowNull: true, defaultValue: S.literal('CURRENT_TIMESTAMP')},
       updated_at:         { type: S.DATE,    allowNull: true, defaultValue: S.literal('CURRENT_TIMESTAMP')},
       
       //FK
       assigned_by:        { type: S.UUID, allowNull: true,
                             references:  { model: 'users', key:  'id'  },
                             onUpdate: 'CASCADE', onDelete: 'SET NULL'  },
       assigned_to:        { type: S.UUID, allowNull: true,
                             references:  { model: 'users', key:  'id'  },
                             onUpdate: 'CASCADE', onDelete: 'SET NULL'  },
       from_user_id:        { type: S.UUID, allowNull: true,
                             references:  { model: 'users', key:  'id'  },
                             onUpdate: 'CASCADE', onDelete: 'SET NULL'  },
    });

    await q.addIndex('tasks', ['assigned_to']);
    await q.addIndex('tasks', ['status']);
    await q.addIndex('tasks', ['expires_date'])
  },

  async down (q) {
    await q.dropTable('tasks');
    await q.sequelize.query('DROP TYPE IF EXISTS "enum_tasks_type";');
    await q.sequelize.query('DROP TYPE IF EXISTS "enum_tasks_status";');
  }
}