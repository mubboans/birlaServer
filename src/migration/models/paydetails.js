'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class payDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  payDetails.init({
    link_id: DataTypes.STRING,
    link_status: DataTypes.STRING,
    link_currency: DataTypes.STRING,
    link_purpose: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'payDetails',
  });
  return payDetails;
};