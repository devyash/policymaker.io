var restify = require('restify');


// Get Oracle Connection and add it to the server req obj(only 1 user)

// //load the oracledb library
// var oracledb = require('oracledb');

// //load the simple oracledb
// var SimpleOracleDB = require('simple-oracledb');

// //modify the original oracledb library
// SimpleOracleDB.extend(oracledb);

// //from this point connections fetched via oracledb.getConnection(...) or pool.getConnection(...)
// //have access to additional functionality.
// var oracledb = require('oracledb');

// oracledb.getConnection(
//   {
//     user          : "hr",
//     password      : "welcome",
//     connectString : "localhost/XE",
//     Hostname: "oracle.cise.ufl.edu",
// 	Port: 1521,
// 	SID: orcl
//   })
//   .then(function(conn) {
//     return conn.execute(
//       "SELECT department_id, department_name " +
//         "FROM departments " +
//         "WHERE manager_id < :id",
//       [110]  // bind value for :id
//     )
//       .then(function(result) {
//         console.log(result.rows);
//         return conn.close();
//       })
//       .catch(function(err) {
//         console.error(err);
//         return conn.close();
//       });
//   })
//   .catch(function(err) {
//     console.error(err);
//   });





function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}

var server = restify.createServer();
server.get('/hello/:name', respond);
server.head('/hello/:name', respond);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});