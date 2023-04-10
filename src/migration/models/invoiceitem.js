'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class invoiceItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  invoiceItem.init({
    itemname: DataTypes.STRING,
    price: DataTypes.NUMBER,
    status: DataTypes.STRING,
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'invoiceItem',
  });
  return invoiceItem;
};