'use strict';
const {
  Model
} = require('sequelize');
const invoice = require('./invoice');
module.exports = (sequelize, DataTypes) => {
  class payDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      payDetails.hasMany(models.invoice,{foreignKey:'payment_id',as:'payDetails'});

      payDetails.hasMany(models.partialPaymentDetail,{foreignKey:'payment_id'});
      // define association here
    }
  }
  payDetails.init({
    invoice_no:DataTypes.INTEGER,
    customer_id:DataTypes.INTEGER,
    cf_link_id:DataTypes.STRING,
    link_id: DataTypes.STRING,
    link_id: DataTypes.STRING,
    link_status: DataTypes.STRING,
    link_currency: DataTypes.STRING,
    link_amount: DataTypes.INTEGER,
    link_partial_payments:DataTypes.BOOLEAN,
    link_partial_amount:DataTypes.INTEGER,
    link_purpose: DataTypes.STRING,
    link_url:DataTypes.STRING,
    link_expiry_time: DataTypes.STRING,
    link_amount_paid:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'payDetails',
  });
  return payDetails;
};