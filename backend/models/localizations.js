'use strict';
module.exports = (sequelize, DataTypes) => {
  const Localization = sequelize.define('Localization', {
    name:           { type: DataTypes.STRING(255), allowNull: false, unique: true },
    country:        { type: DataTypes.STRING, allowNull: true, },
    company_code:   { type: DataTypes.STRING(8), allowNull: true, },
    prefix:          { type: DataTypes.STRING(3), allowNull: false, },
    stock_user_id:   { type: DataTypes.UUID, allowNull: false, },
  }, { tableName: 'localizations', timestamps: true });

  Localization.associate = (models) => {
    Localization.belongsTo(models.User, { foreignKey: 'stock_user_id', as: 'stock_user'})
    Localization.hasMany(models.User, { foreignKey: 'localization_id', as: 'users' });
    Localization.hasMany(models.Asset, { foreignKey: 'localization_id', as: 'assets' });
  };

  return Localization;
};
