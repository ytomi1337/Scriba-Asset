'use strict';
module.exports = (sequelize, DataTypes) => {
  const SimCard = sequelize.define('SimCard', {
    nr:        { type: DataTypes.STRING(9),  allowNull: false },
    pin:           { type: DataTypes.STRING(4),  allowNull: true },
    puk:           { type: DataTypes.STRING(8),  allowNull: true },
    recipt_date:        { type: DataTypes.DATE, allowNull: true},
    return_date:        { type: DataTypes.DATE, allowNull: true},
    localization_id:  { type: DataTypes.INTEGER, allowNull: false },
    user_id:        { type: DataTypes.UUID, allowNull: false },
  }, { tableName: 'sim_cards', timestamps: true});

  SimCard.associate = (models) => {
    SimCard.belongsTo(models.User, { foreignKey: 'user_id', as: 'user'});
    SimCard.belongsTo(models.Localization, { foreignKey: 'localization_id', as: 'localization'});
    SimCard.hasOne(models.Phone, { foreignKey: 'sim_card_id', as:'phone'});
  };

  return SimCard;
};
