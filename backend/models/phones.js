'use strict';
module.exports = (sequelize, DataTypes) => {
  const Phone = sequelize.define('Phone', {
    imei:          { type: DataTypes.STRING(15), allowNull: true, unique: true },
    sim_card_id:      { type: DataTypes.INTEGER, allowNull: true },
    asset_id:      { type: DataTypes.INTEGER, allowNull: false, unique: true},
  }, { tableName: 'phones', timestamps: true });

  Phone.associate = (models) => {
    Phone.belongsTo(models.SimCard,     { foreignKey: 'sim_card_id',   as:'sim-card'});
    Phone.belongsTo(models.Asset,     { foreignKey: 'asset_id',   as:'asset'});
  };

  return Phone;
};
