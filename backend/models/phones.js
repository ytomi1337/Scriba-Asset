'use strict';
module.exports = (sequelize, DataTypes) => {
  const Phone = sequelize.define('Phone', {
    name:          { type: DataTypes.STRING, allowNull: true },
    serial_num:    { type: DataTypes.TEXT, allowNull: true },
    imei:          { type: DataTypes.STRING(15), allowNull: true },
    nr_tel:        { type: DataTypes.STRING(9),  allowNull: true },
    puk:           { type: DataTypes.STRING(8),  allowNull: true },
    pin:           { type: DataTypes.STRING(4),  allowNull: true },
    stan:          { type: DataTypes.STRING,     allowNull: true },
    recipt_date:        { type: DataTypes.DATE, allowNull: true},
    return_date:        { type: DataTypes.DATE, allowNull: true},
    warranty_date:      { type: DataTypes.DATE, allowNull: true},
  }, { tableName: 'phones', timestamps: true });

  Phone.associate = (models) => {
    Phone.belongsTo(models.Status,     { foreignKey: 'status_id',      as: 'status' });
    Phone.belongsTo(models.User,       { foreignKey: 'user_id',        as: 'user' });
    Phone.belongsTo(models.Vendor,     { foreignKey: 'vendor_id',      as: 'vendor' });
  };

  return Phone;
};
