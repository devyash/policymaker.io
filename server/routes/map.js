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

      
      connection.then(function(conn) {

      let query="select state, sum(employed) from employment where year = :year group by state" 
      return conn.execute(query,{
       year:2015
      })
        .then(function(result) {
          let output=result.rows;
          console.log(output);
          res.send(output);
        })

    })
    .catch(function(err) {
      console.error(err);
    });

    }

module.exports = function (server) {
server.get('/map', respond)
};

