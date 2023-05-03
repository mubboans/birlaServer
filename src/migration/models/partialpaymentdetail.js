'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class partialPaymentDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      partialPaymentDetail.belongsTo(models.payDetails,{foreignKey:'payment_id'});
      // define association here
    }
  }
  partialPaymentDetail.init({
    payment_id:DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    payment_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'partialPaymentDetail',
  });
  return partialPaymentDetail;
};