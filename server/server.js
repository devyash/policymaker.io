/*jslint node: true, indent: 2 */
'use strict';
let restify, routes, server;
restify = require('restify');
// var Promise = require("bluebird"); //favourite promise library

// //load the oracledb library
// var oracledb = require('oracledb');

// //load the simple oracledb
// var SimpleOracleDB = require('simple-oracledb');

// //modify the original oracledb library
// SimpleOracleDB.extend(oracledb);

// //from this point connections fetched via oracledb.getConnection(...) or pool.getConnection(...)
// //have access to additional functionality.
// var oracledb = require('oracledb');
// oracledb.Promise = Promise;//setting promise library tobluebird

// // Get Oracle Connection only 1 connection 
// var connection = oracledb.getConnection(
//   {
//     // user          : "hv0",
//     // password      : "Spide123!",
//     user          : "harika",
//     password      : "Oracleme893!",
//     connectString : "oracle.cise.ufl.edu:1521/orcl",
//   });
routes = require('./routes/');
server = restify.createServer({
    name: 'policymaker-api',
    formatters: {
        'application/json': function(req, res, body, cb) {
            res.setHeader('Cache-Control', 'must-revalidate');

            // Does the client *explicitly* accepts application/json?
            const sendPlainText = (req.header('Accept').split(/, */).indexOf('application/json') === -1);

            // Send as plain text
            if (sendPlainText) {
                res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            }

            // Send as JSON
            if (!sendPlainText) {
                res.setHeader('Content-Type', 'application/json; charset=utf-8');
            }
            return cb(null, JSON.stringify(body));
        }
    }
});

server.use(restify.bodyParser({ mapParams: false }));
server.use(restify.queryParser());
server.use(restify.gzipResponse());
server.pre(restify.pre.sanitizePath());


// function respond(req, res, next) {
//   if (req.params.year) {
//     console.log(req.params.year);
//   }
//     connection.then(function(conn) {
//       return conn.execute("SELECT * FROM poverty where rownum = 1")
//         .then(function(result) {
//           res.send(result.rows);
//           //console.log(result.rows);
//           // return conn.close();
//         })

//     })
//     .catch(function(err) {
//       console.error(err);
//     });

//  }

// server.get('/poverty', respond);



routes(server);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});