'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id:               { type: DataTypes.UUID, allowNull: false, primaryKey: true, defaultValue: DataTypes.UUIDV4},
    name:             { type: DataTypes.TEXT, allowNull: false },
    email:            { type: DataTypes.STRING(254), allowNull: true },
    email_verified:   { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false},
    role:             { type: DataTypes.STRING, allowNull: false },
    provider:         { type: DataTypes.STRING, allowNull: true, defaultValue: 'google' },
    provider_id:      { type: DataTypes.STRING, allowNull: true, unique: true},
    metadata:         { type: DataTypes.JSONB, allowNull: true },
    is_active:        { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    last_login:       { type: DataTypes.DATE, allowNull: true },
    manager:          { type: DataTypes.TEXT, allowNull: true },
    position:         { type: DataTypes.TEXT, allowNull: true },
    department:       { type: DataTypes.TEXT, allowNull: true },
    holcim_code:      { type: DataTypes.STRING(8), allowNull: true },
    localization_id:  { type: DataTypes.INTEGER, allowNull: true },
  }, { tableName: 'users', timestamps: true });

  User.associate = (models) => {
    User.belongsTo(models.Localization,  { foreignKey: 'localization_id',  as: 'localization' });
  };

  return User;
};
