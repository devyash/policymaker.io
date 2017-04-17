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


function respond(req, res, next) {

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
      let query = '';
      let N = parseInt(req.params.N);

      if(!N){

       query="select state, (sum(employed)-sum(unemployed)) as total from employment where year = :year group by state" 
       options={
        year:2015
       }
      } 
      else if(N>0){
        query="select state, total from (select state, (sum(employed)-sum(unemployed)) as total from employment+\
        where year = :year group by state order by total desc) where rownum<=:N"
        options={
          year:2015,
          N,
        }
      }
      return conn.execute(query,options)
        .then(function(result) {
          let output=result.rows;
          console.log(output);
          res.send(output);
        }).then(function(x) {
          console.log("Closing Connection..")
        return conn.close();
      })
    })
    .catch(function(err) {
      console.error(err);
    });

    }

module.exports = function (server) {
server.get('/map', respond)
};