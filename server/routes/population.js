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
  var connection = oracledb.getConnection(
  {
     user          : "hv0",
     password      : "Spider321!",
   // user          : "harika",
   //  password      : "Oracleme893!2",
    connectString : "oracle.cise.ufl.edu:1521/orcl",
  });
  
    connection.then(function(conn) {
    let options={};
    let query='';

    if (req.query.type == 'simple') {

      let _year1= parseInt(req.query.fromyear);
        let _year2=parseInt(req.query.toyear);//employed

          query="SELECT * FROM TABLE (PACKAGEQUERY1.FQUERY1 (:fromyear,:toyear))"
        
        options={
          fromyear: _year1,
          toyear: _year2,
        }
      }
      else if (req.query.type =='complex')
      {
        
        let parameter1=req.query.parameter1;
        
        let parameter2=req.query.parameter2;
       
        
    
        
        

        query="select * from Table(POP_QUERY2.RESULT1(:parameter1,:parameter2))"

        options={
          parameter1: parameter1,
          parameter2: parameter2,
          
        }
      }
       return conn.execute(query, options)
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
server.get('/population', respond);

};