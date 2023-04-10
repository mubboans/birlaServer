const Sequelize = require('sequelize').Sequelize;
const {hostname,dbusername,dbpassword,dbname } = require('../config/config')
function connectDB(){
  const sequelize = new Sequelize( dbname , dbusername, dbpassword, { 
    dialect: 'mssql',
    host: hostname,
 }
    )
    sequelize.authenticate().then(() => {
      console.log('Connection has been established successfully.');
    }).catch((error) => {
      console.error('Unable to connect to the database: ', error);
    });
}
// const sequelize = new Sequelize('myDatabase', 'sa', '123', { 
//   dialect: 'mysql', 
//   // dialectOptions: {
//   //   authentication: {
//   //     type: 'ntlm',
//   //     options: {
//   //       domain: 'MUBASHIR',
//   //     }
//   //   },
//   //   options: {
//   //     instanceName: 'MUBASHIR'
//   //   }
//   // }
//   host: 'localhost', port: '1433',
//   dialectOptions: { instanceName: 'MSSQLSERVER' }
//   // dialectOptions: {
//   //   authentication: {
//   //     type: 'ntlm',
//   //     options: {
//   //       domain: 'Mubashir',
//   //       userName: 'mubashir',
//   //       password: '1234'
//   //     }
//   //   },
//   //   options: {
//   //     instanceName: 'MSSQLSERVER'
//   //   }
//   // }

// })
//   sequelize.authenticate().then(x=>{
//     console.log('Connection has been established successfully.');
//   }).catch(x=>{
//     console.error('Unable to connect to the database:', error);
//   });

  module.exports=connectDB;
//   try {
//     await sequelize.authenticate();
    
//   } catch (error) {
//   }