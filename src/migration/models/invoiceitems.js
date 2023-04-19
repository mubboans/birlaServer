'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class invoiceItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // invoiceItems.belongsTo(models.invoice,{foreignKey:'id'})
      invoiceItems.belongsTo(models.invoice,{foreignKey:'invoice_id'})


      invoiceItems.belongsTo(models.itemDetail,{foreignKey:'item_id',as:'items'});
      // define association here
    }
  }
  invoiceItems.init({
    invoice_id:DataTypes.INTEGER,
    item_id:DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'invoiceItems',
  });
  return invoiceItems;
};