'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vendor = sequelize.define('Vendor', {
    name:           { type: DataTypes.TEXT, allowNull: false, unique: true },
    address:        { type: DataTypes.TEXT, allowNull: true, },
  }, { tableName: 'vendors', timestamps: true });

  Vendor.associate = (models) => {
    Vendor.hasMany(models.Model, { foreignKey: 'vendor_id', as: 'models' });
    Vendor.hasMany(models.Phone, { foreignKey: 'vendor_id', as: 'phones' });
  };

  return Vendor;
};
