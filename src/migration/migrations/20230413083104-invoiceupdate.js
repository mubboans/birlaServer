'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      // queryInterface.changeColumn('invoices', 'invoiceno', {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   unique:true
      
      // }),
      await queryInterface.addConstraint('invoices', {
        fields: ['id', 'invoiceno'],
        type: 'unique',
        name: 'unique_id_invoice_number'
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
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
