/*jslint node: true, indent: 2 */
'use strict';
let Promise,oracledb,SimpleOracleDB;
Promise = require("bluebird"); //favourite promise library
oracledb = require('oracledb');
SimpleOracleDB = require('simple-oracledb');
SimpleOracleDB.extend(oracledb);
oracledb.Promise = Promise;//setting promise library tobluebird
oracledb.outFormat = oracledb.OBJECT;
// Get Oracle Connection only 1 connection 
var connection = oracledb.getConnection(
  {
    // user          : "hv0",
    // password      : "Spide123!",
    user          : "harika",
    password      : "Oracleme893!",
    connectString : "oracle.cise.ufl.edu:1521/orcl",
  });

function respond(req, res, next) {

  if (req.params.type === "simple") {
    
    if (req.params.selectrange === "top")  {
    
      connection.then(function(conn) {
      return conn.execute("select * from (select state,sum(" + req.params.criteria + ") as total from employment group by state order by total desc) where ROWNUM<="+ req.params.N+";")
        .then(function(result) {
          let output=result.rows;
          res.send(output);
        })

    })
    .catch(function(err) {
      console.error(err);
    });

    }

    else {

      connection.then(function(conn) {
      return conn.execute("select * from (select state,sum(" + req.params.criteria + ") as total from employment group by state order by total) where ROWNUM<="+ req.params.N+";")
        .then(function(result) {
          let output=result.rows;
          res.send(output);
        })

    })
    .catch(function(err) {
      console.error(err);
    });

    }
    
  }

 }

module.exports = function (server) {
server.get('/employment', respond);

};
