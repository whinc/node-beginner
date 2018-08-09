const http = require('http');
const process = require('process');


function start(router) {
    let server = http.createServer((req, res) => {
        router.route(req, res);
    });
    server.listen(8090);
    console.log('start server in http://localhost:' + server.address().port);
}

exports.start = start;