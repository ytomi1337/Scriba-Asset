'use strict';
module.exports = (sequelize, DataTypes) => {
  const Localization = sequelize.define('Localization', {
    name:           { type: DataTypes.STRING(255), allowNull: false, unique: true },
    country:        { type: DataTypes.STRING, allowNull: true, },
    company_code:   { type: DataTypes.STRING(8), allowNull: true, },
    prefix:          { type: DataTypes.STRING(3), allowNull: false, },
  }, { tableName: 'localizations', timestamps: true });

  Localization.associate = (models) => {
    Localization.hasMany(models.User, { foreignKey: 'localization_id', as: 'users' });
    Localization.hasMany(models.Asset, { foreignKey: 'localization_id', as: 'assets' });
  };

  return Localization;
};
