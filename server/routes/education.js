/*jslint node: true, indent: 2 */
'use strict';
let Promise,oracledb,SimpleOracleDB;
Promise = require("bluebird"); //favourite promise library
oracledb = require('oracledb');
SimpleOracleDB = require('simple-oracledb');
SimpleOracleDB.extend(oracledb);
oracledb.Promise = Promise;//setting promise library tobluebird
oracledb.outFormat = oracledb.OBJECT;


function respond(req, res, next) {

// Get Oracle Connection only 1 connection 
var connection = oracledb.getConnection(
  {
    // user          : "hv0",
    // password      : "Spider321!",
    user          : "harika",
    password      : "Oracleme893!2",
    connectString : "oracle.cise.ufl.edu:1521/orcl",
  });

  connection.then(function(conn) {
    let options={};
    let query='';

    if (req.params.type == 'simple') {

      let N=parseInt(req.params.N);
      
        query="select * from TABLE(edu_pkg1.edu_litpov_fun(:N))"
        
        options={
          N: N
        }
      }
      else {
        let fromyear=parseInt(req.params.fromyear);
        let toyear=parseInt(req.params.toyear);
        
        query="select * from TABLE(edu_pkg2.edu_gap_fun(:fromyear,:toyear))"

        options={
          fromyear: fromyear,
          toyear: toyear
        }
      }


        console.log(options);
        return conn.execute(query, options)
        .then(function(result) {
          let output=result.rows;
          console.log(output);
          res.send(output);
        }).then(function(x) {
        return conn.close();
      })
      })
  .catch(function(err) {
    console.error(err);
  });

}
module.exports = function (server) {
server.get('/education', respond);

};