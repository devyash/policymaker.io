var Promise = require("bluebird"); //favourite promise library
//load the oracledb library
var oracledb = require('oracledb');
var SimpleOracleDB = require('simple-oracledb');
SimpleOracleDB.extend(oracledb);

oracledb.Promise = Promise;//setting promise library tobluebird

// Get Oracle Connection only 1 connection as node-oracledb doesnt support SIDs
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
      return conn.execute("SELECT * FROM poverty where rownum = 1")
        .then(function(result) {
          res.send(result.rows);
          //console.log(result.rows);
          // return conn.close();
        })

    })
    .catch(function(err) {
      console.error(err);
    });

 }

module.exports = {
  respond: respond,

};