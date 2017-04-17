/*jslint node: true, indent: 2 */
'use strict';
let Promise,oracledb,SimpleOracleDB;
Promise = require("bluebird"); //favourite promise library
oracledb = require('oracledb');
SimpleOracleDB = require('simple-oracledb');
SimpleOracleDB.extend(oracledb);
oracledb.Promise = Promise;//setting promise library tobluebird
oracledb.outFormat = oracledb.OBJECT;

function respond(req,res,next){
  console.log("inside get")

// Get Oracle Connection only 1 connection 
var connection = oracledb.getConnection(
  {
   //  user          : "hv0",
   //  password      : "Spider321!",
    user          : "harika",
    password      : "Oracleme893!2",
    connectString : "oracle.cise.ufl.edu:1521/orcl",
  });
  console.log("connection got")
   connection.then(function(conn) {
    let options={};
    let query='';

query="Select policy_id, policy_name,policy_approved from policy"
return conn.execute(query)
        .then(function(result) {
          let abc=result.rows;
          console.log(abc);
          res.send(abc);
        }).then(function(x) {
        return conn.close();
      })
   }) 
  .catch(function(err) {
    console.error(err);
  });
}
module.exports = function (server) {
server.get('/policyapprove', respond);


};