'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    icon: { type: DataTypes.STRING, allowNull: false,},
  }, { tableName: 'categories', timestamps: true });

  Category.associate = (models) => {
    Category.hasMany(models.Model, { foreignKey: 'category_id', as: 'models' });
  };

  return Category;
};
