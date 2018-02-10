/*jslint node: true, indent: 2 */
'use strict';
let restify, routes, server;
restify = require('restify');
const plugins = require('restify-plugins')
routes = require('./routes/');
server = restify.createServer({
    name: 'policymaker-api',
    // formatters: {
    //     'application/json': function(req, res, body, cb) {
    //         res.setHeader('Cache-Control', 'must-revalidate');
    //
    //         // Does the client *explicitly* accepts application/json?
    //         const sendPlainText = (req.header('Accept').split(/, */).indexOf('application/json') === -1);
    //
    //         // Send as plain text
    //         if (sendPlainText) {
    //             res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    //         }
    //
    //         // Send as JSON
    //         if (!sendPlainText) {
    //             res.setHeader('Content-Type', 'application/json; charset=utf-8');
    //         }
    //         return cb(null, JSON.stringify(body));
    //     }
    // }
});

server.use(plugins.bodyParser({ mapParams: true }));
server.use(plugins.queryParser());
server.use(plugins.gzipResponse());
server.pre(plugins.pre.sanitizePath());

//Enable CORS temporary for all links
server.use(
  function crossOrigin(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  }
);

routes(server);

server.listen(5000, function() {
  console.log('%s listening at %s', server.name, server.url);
});
