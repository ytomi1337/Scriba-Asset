'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('Model', {
    name:       { type: DataTypes.STRING, allowNull: false, unique: true},
    vendor_id:  { type: DataTypes.INTEGER, allowNull: true },
    category_id:  { type: DataTypes.INTEGER, allowNull: false },

  }, { tableName: 'models', timestamps: true });

  Model.associate = (models) => {
    Model.belongsTo(models.Vendor,        { foreignKey: 'vendor_id',    as: 'vendor' });
    Model.belongsTo(models.Category,        { foreignKey: 'category_id',    as: 'category' });
    Model.hasMany(models.Asset,        { foreignKey: 'model_id',    as: 'assets' });
  };

  return Model;
};
