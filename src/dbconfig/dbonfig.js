const Sequelize = require('sequelize').Sequelize;
// MUBASHIR
// const d = new Sequelize()
// const sequelize = new Sequelize(
//     'testDatabase', null, null, {
//         dialect: 'mssql',
//         dialectOptions: {
//             connectionString: '.;Database=testDatabase;Trusted_Connection=True;',
//           authentication: {
//             type: 'ntlm',
//             options: {
//               domain: 'MUBASHIR',
//             }
//           },
//           options: {
//             instanceName: 'SQLEXPRESS'
//           }
//         }
//     // dialect: 'mssql',
//     // host: 'localhost',
//     // dialectModulePath:require.resolve('sequelize-msnodesqlv8'),
//     // dialectOptions: {
//     //     connectionString: .;Database=master;Trusted_Connection=True;',
//         // authentication: {
//         //     type: 'ntlm',
//         //     options: {
//         //         domain: 'MUBASHIR',
//         //       },
//             // type: 'default',
//         // }, 
//         // trustedConnection: true,
//     //     options: { 
//     //       encrypt: true,
//     //       trustServerCertificate: true,
//     //       instanceName: 'MSSQLSERVER',
//     //       validateBulkLoadParameters: true,
//     //       integratedSecurity: true,
//     //     },
//     //   },
  
// });
// { host: 'localhost', dialect: 'mssql',  }
function connectDB(){
  const sequelize = new Sequelize('nodelearn', 'nodelearn', '50x8?6Hix', { 
    dialect: 'mssql',
    host: 'SG2NWPLS19SQL-v04.mssql.shr.prod.sin2.secureserver.net',
  // dialectOptions: { instanceName: 'MSSQLSERVER' }
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