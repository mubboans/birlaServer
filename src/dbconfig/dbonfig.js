const Sequelize = require('sequelize').Sequelize;
const {hostname,dbusername,dbpassword,dbname } = require('../config/config')
const sequelize = new Sequelize( dbname , dbusername, dbpassword, { 
  dialect: 'mssql',
  host: hostname,
  port: 1433,
  logging:false
}
  )
function connectDB(){
    sequelize.authenticate().then(() => {
      console.log('Connection has been established successfully.');
    }).catch((error) => {
      console.error('Unable to connect to the database: ', error);
    });
}
// async function checkUnique(){
// const queryResult =await sequelize.query("SELECT * FROM invoice", { type: Sequelize.QueryTypes.SELECT })
// const columnDescription = queryResult;
// if (columnDescription.CONSTRAINT_TYPE === 'UNIQUE') {
//   console.log('The "myColumn" column has a unique constraint.');
// } else {
//   console.log('The "myColumn" column does not have a unique constraint.');
// }
// }
// checkUnique()
// function checkTable (){
//   sequelize.query("SELECT * FROM invoiceItems", { type: Sequelize.QueryTypes.SELECT })
//   .then(results => {
//     if (results.length > 0) {
//       console.log('Table exists in the database.',results);
//     } else {
//       console.log('Table does not exist in the database.');
//     }
//   })
//   .catch(error => {
//     console.error('Error checking for table existence:', error);
//   });
// }

// checkTable ();

  module.exports=connectDB;
