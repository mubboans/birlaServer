const Sequelize = require('sequelize').Sequelize;
const {hostname,dbusername,dbpassword,dbname } = require('../config/config')
const sequelize = new Sequelize( dbname , dbusername, dbpassword, { 
  dialect: 'mssql',
  host: hostname,
}
  )
function connectDB(){
    sequelize.authenticate().then(() => {
      console.log('Connection has been established successfully.');
    }).catch((error) => {
      console.error('Unable to connect to the database: ', error);
    });
}
function checkTable (){
  sequelize.query("SELECT * FROM invoiceItems", { type: Sequelize.QueryTypes.SELECT })
  .then(results => {
    if (results.length > 0) {
      console.log('Table exists in the database.',results);
    } else {
      console.log('Table does not exist in the database.');
    }
  })
  .catch(error => {
    console.error('Error checking for table existence:', error);
  });
}

// checkTable ();

  module.exports=connectDB;
