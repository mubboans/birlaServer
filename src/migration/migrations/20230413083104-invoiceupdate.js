'use strict';
const {invoice,payDetails,User} = require('../models')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize,sequelize) {
    return Promise.all([
      // queryInterface.changeColumn('invoices', 'invoiceno', {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   unique:true
      
      // }),
      // const tabName = se
    //  invoice.hasOne(User),
      // await queryInterface.addConstraint('invoices', {
      //   fields: ['id', 'invoiceno'],
      //   type: 'unique',
      //   name: 'unique_id_invoice_number'
      // })
      await queryInterface.addColumn('payDetails', 'link_amount_paid', {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue:0
      })

    ]);
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('payDetails', 'link_amount_paid');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
