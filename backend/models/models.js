'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('Model', {
    name:       { type: DataTypes.STRING, allowNull: false, unique: true},
    vendor_id:  { type: DataTypes.INTEGER, allowNull: true },

  }, { tableName: 'models', timestamps: true });

  Model.associate = (models) => {
    Model.belongsTo(models.Vendor,        { foreignKey: 'vendor_id',    as: 'vendor' });
  };

  return Model;
};
