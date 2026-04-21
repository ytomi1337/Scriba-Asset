module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    id:               { type: DataTypes.UUID, allowNull: false, primaryKey: true, defaultValue: DataTypes.UUIDV4},
    assigned_by:      { type: DataTypes.UUID, allowNull: false },
    assigned_to:      { type: DataTypes.UUID, allowNull: false },
    from_user_id:     { type: DataTypes.UUID, allowNull: true },
    status:           { type: DataTypes.ENUM('Pending','Accepted','Rejected','Cancelled'), allowNull: false, defaultValue: 'Pending' },
    type:             { type: DataTypes.ENUM('Assign','Return','User Transfer','Other','Created'), allowNull: false, },
    file:             { type: DataTypes.STRING, allowNull: true },
    expires_date:     { type: DataTypes.DATE, allowNull: true },
    confirmed_at:     { type: DataTypes.DATE, allowNull: true }
  }, {
    tableName: 'tasks',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  Task.associate = (models) => {
    Task.belongsTo(models.User, { as: 'assignedBy', foreignKey: 'assigned_by' });
    Task.belongsTo(models.User, { as: 'assignedTo', foreignKey: 'assigned_to' });
    Task.belongsTo(models.User, { as: 'fromUserId', foreignKey: 'from_user_id' });
    Task.hasMany(models.TaskAsset, { as: 'items', foreignKey: 'task_id' });
  };

  return Task;
};
