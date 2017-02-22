const http = require('http');
const process = require('process');


function start(router) {
    let server = http.createServer((req, res) => {
        router.route(req, res);
    });
    server.listen(8080);
    console.log('start server in ' + process.cwd());
}

exports.start = start;