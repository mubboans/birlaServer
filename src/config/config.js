module.exports = Object.assign({},{
    hostname:process.env.HOSTNAME || "SG2NWPLS19SQL-v04.mssql.shr.prod.sin2.secureserver.net",
    dbusername:process.env.DBNAME || "nodelearn",
    dbpassword:process.env.DBPASSWORD || "50x8?6Hix",  
    dbname: process.env.DBNAME || "nodelearn",
    port : process.env.PORT || 8000,
})