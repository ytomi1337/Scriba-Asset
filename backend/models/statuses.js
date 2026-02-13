'use strict';
module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define('Status', {
    name: { type: DataTypes.STRING(255), allowNull: false, unique: true },
  }, { tableName: 'statuses', timestamps: true });

  Status.associate = (models) => {
    Status.hasMany(models.Asset, { foreignKey: 'status_id', as: 'assets' });
  };

  return Status;
};
