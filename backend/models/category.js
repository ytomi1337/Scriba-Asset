'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    icon: { type: DataTypes.STRING, allowNull: false,},
  }, { tableName: 'categories', timestamps: true });

  Category.associate = (models) => {
    Category.hasMany(models.Asset, { foreignKey: 'category_id', as: 'assets' });
  };

  return Category;
};
