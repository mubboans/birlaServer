'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class invoicePayementMethod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      invoicePayementMethod.belongsTo(models.invoice,{foreignKey:'invoice_id'})
      // define association here
    }
  }
  invoicePayementMethod.init({
    type: DataTypes.INTEGER,
    invoice_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'invoicePayementMethod',
  });
  return invoicePayementMethod;
};