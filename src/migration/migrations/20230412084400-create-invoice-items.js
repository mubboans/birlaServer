'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('invoiceItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      invoice_id:{
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'invoices',
          key: 'id'
        }
      },
      item_id:{
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'itemDetails',
          key: 'id'
        }
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('invoiceItems');
  }
};