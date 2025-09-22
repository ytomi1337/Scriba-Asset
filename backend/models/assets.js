'use strict';
module.exports = (sequelize, DataTypes) => {
  const Asset = sequelize.define('Asset', {
    name:          { type: DataTypes.STRING, allowNull: false },
    it_num:        { type: DataTypes.STRING, allowNull: false, unique: true },
    serial_num:    { type: DataTypes.STRING, allowNull: false, unique: true},
    note:          { type: DataTypes.TEXT, allowNull: true },
    recipt_date:   { type: DataTypes.DATE, allowNull: true },
    return_date:   { type: DataTypes.DATE, allowNull: true },
    warranty_date: { type: DataTypes.DATE, allowNull: true },
    category_id:    { type: DataTypes.INTEGER, allowNull: true },
    license_id:     { type: DataTypes.INTEGER, allowNull: true },
    status_id:      { type: DataTypes.INTEGER, allowNull: true },
    user_id:        { type: DataTypes.INTEGER, allowNull: true },
    vendor_id:      { type: DataTypes.INTEGER, allowNull: true },
  }, { tableName: 'assets', timestamps: true });

  Asset.associate = (models) => {
    Asset.belongsTo(models.Category,      { foreignKey: 'category_id',  as: 'category' });
    Asset.belongsTo(models.License,       { foreignKey: 'license_id',   as: 'license' });
    Asset.belongsTo(models.Status,        { foreignKey: 'status_id',    as: 'status' });
    Asset.belongsTo(models.User,          { foreignKey: 'user_id',      as: 'user' });
    Asset.belongsTo(models.Vendor,        { foreignKey: 'vendor_id',    as: 'vendor' });
  };

  return Asset;
};
