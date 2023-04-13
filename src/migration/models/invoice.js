'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  invoice.init({
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