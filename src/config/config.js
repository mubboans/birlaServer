module.exports = Object.assign({},{
    hostname:process.env.HOSTNAME || "SG2NWPLS19SQL-v04.mssql.shr.prod.sin2.secureserver.net",
    dbusername:process.env.DBNAME || "nodelearn",
    dbpassword:process.env.DBPASSWORD || "50x8?6Hix",  
    dbname: process.env.DBNAME || "nodelearn",
    port : process.env.PORT || 8000,
    cashId : process.env.CASHAPPID || "TEST342658a0e673913def5d5485c0856243",
    cashServer : process.env.CASHSECRETKEY || "TEST7089f86d5c58cc1f1b73ae52c7fc4334d9aaa732"
})