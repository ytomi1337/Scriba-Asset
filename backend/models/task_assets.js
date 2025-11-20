module.exports = (sequelize, DataTypes) => {
  const TaskAsset = sequelize.define('TaskAsset', {
    task_id:    {  type: DataTypes.UUID, allowNull: false },
    asset_id:   {   type: DataTypes.UUID, allowNull: false}
  }, {
    tableName: 'task_assets',
    underscored: true,
    timestamps: true
  });

  TaskAsset.associate = (models) => {
    TaskAsset.belongsTo(models.Task, { foreignKey: 'task_id', as: 'task' });
    TaskAsset.belongsTo(models.Asset, { foreignKey: 'asset_id', as: 'asset' });
  };

  return TaskAsset;
};