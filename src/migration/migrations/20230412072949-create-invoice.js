'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('invoices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customer_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
      }},
      payment_id:{
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'payDetails',
          key: 'id'
      } 
      },
      order_id:{
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'orderDetails',
          key: 'id'
      }
      },
      invoiceno: {
        type: Sequelize.INTEGER
      },
      invoicedate: {
        type: Sequelize.DATE
      },
      paymentType: {
        type: Sequelize.INTEGER
      },
      bill_link_id: {
        type: Sequelize.STRING
      },
      totalamount: {
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
    await queryInterface.dropTable('invoices');
  }
};