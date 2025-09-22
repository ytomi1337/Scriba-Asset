'use strict';
module.exports = (sequelize, DataTypes) => {
  const License = sequelize.define('License', {
    name:                  { type: DataTypes.STRING, allowNull: false },
    license_key:           { type: DataTypes.TEXT, allowNull: true, unique: true },
    license_type:          { type: DataTypes.STRING, allowNull: true },
    note:                  { type: DataTypes.TEXT, allowNull: true },
    purchase_price:        { type: DataTypes.STRING, allowNull: true },
    purchase_date:         { type: DataTypes.DATE, allowNull: true },
    warranty_date:         { type: DataTypes.DATE, allowNull: true },
    status:                { type: DataTypes.STRING, allowNull: true },
    seats:                 { type: DataTypes.INTEGER, allowNull: true },
    valid_from:            { type: DataTypes.DATE, allowNull: true },
    valid_to:              { type: DataTypes.DATE, allowNull: true },
    created_by:            { type: DataTypes.DATE, allowNull: true },
  }, 
  { tableName: 'licenses', timestamps: true });

  License.associate = (models) => {
    License.belongsTo(models.User,          { foreignKey: 'user_id',      as: 'user' });
    License.belongsTo(models.Vendor,        { foreignKey: 'vendor_id',    as: 'vendor' });
  };

  return License;
};
