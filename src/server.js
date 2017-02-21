const http = require('http');


function start(router) {
    let onRequest = (request, response) => {
        let pathname = request.url;
        router(pathname);
        response.writeHead(200, http.STATUS_CODES[200], {
            'Content-Type': 'text/plain'
        });
        response.write('url:' + request.url + '\n');
        response.end('hello world xxx');
    }

    let server = http.createServer(onRequest);
    server.listen(8080);
    console.log('start server');
}

exports.start = start;