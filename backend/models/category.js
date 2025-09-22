'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: { type: DataTypes.STRING(255), allowNull: false, unique: true },
  }, { tableName: 'categories', timestamps: true });

  Category.associate = (models) => {
    Category.hasMany(models.Asset, { foreignKey: 'category_id', as: 'assets' });
    Category.hasMany(models.Phone, { foreignKey: 'category_id', as: 'phones' });
  };

  return Category;
};
