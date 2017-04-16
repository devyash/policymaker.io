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
    let options={};
    let query='';

    if (req.params.type = 'simple') {

      let N=parseInt(req.params.N);
        let criteria=req.params.criteria;//employed
        let selectrange=req.params.selectrange;

        query="select * from TABLE(emp_pkg1.emp_topbot_fun(:selectrange,:criteria,:N))"
        
        options={
          selectrange: selectrange,
          criteria: criteria,
          N: N
        }
      }
      else {
        let fromc=parseInt(req.params.fromc);
        let to_year=parseInt(req.params.toc);
        let rate_typ=req.params.ratec;
        let order_typ=req.params.selectrangec;
        let attribute1=req.params.criteriac;
        let N=parseInt(req.params.Nc);

        query="select * from TABLE(emp_pkg2.emp_growthdecline_fun(:from_year,:to_year,:rate_typ,:attribute1, :order_typ,:N))"

        options={
          from_year: fromc,
          to_year: to_year,
          rate_typ: rate_typ,
          attribute1: attribute1,
          order_typ: order_typ,
          N: N
        }
      }



        return conn.execute(query, options)
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
  server.get('/employment', respond);

};