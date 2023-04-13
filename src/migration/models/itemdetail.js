'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class itemDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  itemDetail.init({
    itemname: DataTypes.STRING,
    itemprice: DataTypes.INTEGER,
    status: DataTypes.STRING,
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'itemDetail',
  });
  return itemDetail;
};