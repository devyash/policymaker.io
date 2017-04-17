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
   //  user          : "hv0",
   //  password      : "Spider321!",
    user          : "harika",
    password      : "Oracleme893!2",
    connectString : "oracle.cise.ufl.edu:1521/orcl",
  });
  
    connection.then(function(conn) {
    let options={};
    let query='';

    if (req.body.body.type == 'submit') {
              

        let policystate = req.body.body.policystate;

        let policycounty = req.body.body.policycounty;
        let policyname=req.body.body.policyname;
        let policydescription= req.body.body.policydescription;
        let policyduration=0;
        let policybudget = 0;

        //if (policyduration!==null && policybudget!==null){
        policyduration=parseInt(req.body.body.policyduration);
        policybudget= parseInt(req.body.body.policybudget);
        let selecteddomain = req.body.body.selecteddomain;

      if( policyname!==null && policydescription!==null && policyduration!==null &&  policybudget!==null && selecteddomain!==null )

        {
      
          // this.query("BEGIN insert_policy(:policystate, :policycounty, :selecteddomain,:policyduration,:policybudget,:policyname,:policydescription);END;")
          query = "CALL policy_pkg.insert_policy(:policystate, :policycounty, :selecteddomain,:policyduration,:policybudget,:policyname,:policydescription)"
         //query="execute policy_pkg.insert_policy(:policystate, :policycounty, :selecteddomain,:policyduration,:policybudget,:policyname,:policydescription)"
        
        options={

         policystate : policystate,
          policycounty : policycounty,
          selecteddomain : selecteddomain,
          policyduration : policyduration,
          policybudget : policybudget,
          policyname : policyname,
          policydescription : policydescription,

          /*policystate : 'FL',
          policycounty : 'Florida',
          selecteddomain : 'Education',
          policyduration : 5,
          policybudget : 1000000,
          policyname : 'bla12',
          policydescription : 'bla123',*/


        }}}
      
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
server.post('/policy', respond);

};