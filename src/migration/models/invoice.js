'use strict';
const {
  Model
} = require('sequelize');

// const payDetails =require('../models')['payDetails']
module.exports = (sequelize, DataTypes) => {
  class invoice extends Model {

    static associate(models) {
      invoice.belongsTo(models.User,{foreignKey:'customer_id',as:'Users'});
      invoice.belongsTo(models.payDetails,{foreignKey:'payment_id'});
      invoice.hasMany(models.invoiceItems,{foreignKey:'invoice_id'})
      invoice.belongsTo(models.orderDetail, { foreignKey: 'id' });
    }
  }
  invoice.init({
    customer_id: DataTypes.INTEGER,
    payment_id: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER,
    invoiceno: DataTypes.INTEGER,
    invoicedate: DataTypes.DATE,
    paymentType: DataTypes.INTEGER,
    bill_link_id: DataTypes.STRING,
    totalamount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'invoice',
  });
  return invoice;
};