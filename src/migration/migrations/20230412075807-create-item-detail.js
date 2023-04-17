'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('itemDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      itemname: {
        type: Sequelize.STRING
      },
      itemprice:{
        type: Sequelize.INTEGER,
        defaultValue:100
      },
      status: {
        type: Sequelize.STRING,
        defaultValue:'active'
      },
      category: {
        type: Sequelize.STRING,
        defaultValue:'appliances'
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
    await queryInterface.dropTable('itemDetails');
  }
};