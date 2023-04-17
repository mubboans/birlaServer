'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orderDetails', {
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
        }
      },
      order_note:{
        type: Sequelize.STRING,
      },
      entity: {
        type: Sequelize.STRING,
      },
      order_meta_return_url: {
        type: Sequelize.STRING,
      },
      order_meta_notify_url: {
        type: Sequelize.STRING,
      },
      order_meta_payment_methods: {
        type: Sequelize.STRING,
      },
      cf_order_id: {
        type: Sequelize.INTEGER,
      },
      transactionId: {
        type: Sequelize.STRING
      },
      settlements_url: {
        type: Sequelize.STRING
      },
      refunds_url: {
        type: Sequelize.STRING
      },
      payments_url: {
        type: Sequelize.STRING
      },
      payment_session_id: {
        type: Sequelize.STRING
      },
      order_tags: {
        type: Sequelize.STRING
      },
      order_status: {
        type: Sequelize.STRING
      },
      order_id: {
        type: Sequelize.STRING
      },
      order_expiry_time: {
        type: Sequelize.STRING
      },
      order_currency: {
        type: Sequelize.STRING
      },
      order_amount: {
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
    await queryInterface.dropTable('orderDetails');
  }
};