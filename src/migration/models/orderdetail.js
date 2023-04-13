'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  orderDetail.init({
    transactionId: DataTypes.STRING,
    settlements_url: DataTypes.STRING,
    refunds_url: DataTypes.STRING,
    payments_url: DataTypes.STRING,
    payment_session_id: DataTypes.STRING,
    order_tags: DataTypes.STRING,
    order_status: DataTypes.STRING,
    order_id: DataTypes.STRING,
    order_expiry_time: DataTypes.STRING,
    order_currency: DataTypes.STRING,
    order_amount: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'orderDetail',
  });
  return orderDetail;
};