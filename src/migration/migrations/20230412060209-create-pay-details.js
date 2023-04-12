'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payDetails', {
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
    cf_link_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      link_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      link_status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      link_currency: {
        type: Sequelize.STRING,
        allowNull: false
      },

      link_amount: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      link_partial_payments: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      link_partial_amount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      link_purpose: {
        type: Sequelize.STRING,
        defaultValue: "Invoice"
      },
      link_url: {
        type: Sequelize.STRING,
        allowNull: false
      },
      link_expiry_time: {
        type: Sequelize.STRING,
        allowNull: false
      },
      send_email: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      send_sms: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
    await queryInterface.dropTable('payDetails');
  }
};