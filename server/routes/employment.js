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
     // user          : "hv0",
     // password      : "Spider321!",
   user          : "harika",
    password      : "Oracleme893!2",
    connectString : "oracle.cise.ufl.edu:1521/orcl",
  });

  connection.then(function(conn) {
    let options={};
    let query='';

    if (req.query.type == 'simple') {

      let N=parseInt(req.query.N);
      let criteria=req.query.criteria;//employed
      let selectrange=req.query.selectrange;

        query="select * from TABLE(emp_pkg1.emp_topbot_fun(:selectrange,:criteria,:N))"

        options={
          selectrange: selectrange,
          criteria: criteria,
          N: N
        }
      }
      else {
        let fromc=parseInt(req.query.fromc);
        let toc=parseInt(req.query.toc);
        let ratec=req.query.ratec;
        let selectrangec=req.query.selectrangec;
        let criteriac=req.query.criteriac;
        let Nc=parseInt(req.query.Nc);

        query="select * from TABLE(emp_pkg2.emp_growthdecline_fun(:fromc,:toc,:ratec,:criteriac, :selectrangec,:Nc))"

        options={
          fromc: fromc,
          toc: toc,
          ratec: ratec,
          criteriac: criteriac,
          selectrangec: selectrangec,
          Nc: Nc
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
  server.get('/employment', respond);

};
