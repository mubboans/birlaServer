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
      itemname: {
        type: Sequelize.STRING,
        
      },
      price: {
        type: Sequelize.INTEGER,
        defaultValue:100
      },
      status: {
        type: Sequelize.STRING,
        defaultValue:'Active'
      },
      category: {
        type: Sequelize.STRING,
        defaultValue:'Appliances'
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