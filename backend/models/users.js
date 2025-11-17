'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id:               { type: DataTypes.UUID, allowNull: false, primaryKey: true, defaultValue: DataTypes.UUIDV4},
    name:             { type: DataTypes.TEXT, allowNull: false },
    email:            { type: DataTypes.STRING(254), allowNull: false },
    email_verified:   { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    role:             { type: DataTypes.STRING, allowNull: true },
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
    status:           { type: DataTypes.ENUM('invited', 'active', 'disabled'), allowNull: false },
    claim_token:      { type: DataTypes.STRING, allowNull: true },
    claim_token_expires_at:  { type: DataTypes.DATE, allowNull: true },
    
  }, { tableName: 'users', timestamps: true });

  User.associate = (models) => {
    User.belongsTo(models.Localization,  { foreignKey: 'localization_id',  as: 'localization' });
  };

  return User;
};
