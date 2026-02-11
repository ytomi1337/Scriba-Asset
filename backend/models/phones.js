'use strict';
module.exports = (sequelize, DataTypes) => {
  const Phone = sequelize.define('Phone', {
    serial_num:    { type: DataTypes.TEXT, allowNull: true },
    imei:          { type: DataTypes.STRING(15), allowNull: true },
    stan:          { type: DataTypes.STRING,     allowNull: true },
    recipt_date:        { type: DataTypes.DATE, allowNull: true},
    return_date:        { type: DataTypes.DATE, allowNull: true},
    warranty_date:      { type: DataTypes.DATE, allowNull: true},
    model_id:      { type: DataTypes.INTEGER, allowNull: true },
    user_id:      { type: DataTypes.UUID, allowNull: true },
    status_id:      { type: DataTypes.INTEGER, allowNull: true },
    sim_card_id:      { type: DataTypes.INTEGER, allowNull: true },
  }, { tableName: 'phones', timestamps: true });

  Phone.associate = (models) => {
    Phone.belongsTo(models.Status,     { foreignKey: 'status_id',      as: 'status' });
    Phone.belongsTo(models.User,       { foreignKey: 'user_id',        as: 'user' });
    Phone.belongsTo(models.Model,       { foreignKey: 'model_id',        as: 'model' });
    Phone.belongsTo(models.SimCard,     { foreignKey: 'sim_card_id',   as:'sim-card'});
    
  };

  return Phone;
};
