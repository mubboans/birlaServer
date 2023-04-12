const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const invoiceItems = sequelize.define('invoiceItems', {
  itemname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue:100
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue:'active'
  },
  category: {
    type: DataTypes.STRING,
    defaultValue:'Network Appliance'
  }
}, {
});


module.exports = invoiceItems;