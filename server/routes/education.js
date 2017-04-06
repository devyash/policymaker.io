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
    user          : "harika",
    password      : "Oracleme893!",
    connectString : "oracle.cise.ufl.edu:1521/orcl",
  });

function respond(req, res, next) {
  if (req.params.year) {
    console.log(req.params.year);
  }
    connection.then(function(conn) {
      return conn.execute("SELECT * FROM education")
        .then(function(result) {
          let output=result.rows;
          res.send(output);
          //console.log(result.rows);
          //return conn.close();
        })

    })
    .catch(function(err) {
      console.error(err);
    });

 }

module.exports = function (server) {
server.get('/education', respond);

};
