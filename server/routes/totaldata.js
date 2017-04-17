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
    let query='';

    if (req.params.type == 'population') {
        query="select count(*) as SUMTOTAL from population"
        
      }
      else if (req.params.type == 'education'){
         query="select count(*) as SUMTOTAL from education"
         
      }
      else if (req.params.type == 'employment'){
         query="select count(*) as SUMTOTAL from employment"
          
      }
      else if (req.params.type == 'poverty'){
         query="select count(*) as SUMTOTAL from poverty"
         
      }
      else{
         query="select *  from table (rettotal.result1)"

      }

        return conn.execute(query).then(function(result) {
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
server.get('/totaldata', respond);

}