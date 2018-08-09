const http = require('http'),
      child_process = require('child_process');
const fs = require('fs')
const url = require('url')
const {URLSearchParams} = require('url')
const formidable = require('formidable')

let handlers = {
    '/start': function (req, res) {
      fs.readFile('html/upload.html', (err, data) => {
        if (err) {
          return errorHandle(err, res);
        }
        res.end(data);
      })
    },
    '/upload': function (req, res) {
      const form = new formidable.IncomingForm()
      console.log('about to parse')
      form.parse(req, function (error, fields, files) {
        if (error) {
          return errorHandle(error, res)
        }
        fs.rename(files.file.path, 'upload/test.png', function (error) {
          if (error) {
            return errorHandle(error, res)
          }
          res.writeHead(200, {'Content-Type': 'text/plain'})
          res.end('upload done');
        })
      })
    },
    '/show': function (req, res) {
      fs.readFile('upload/test.png', function (error, data) {
        if (error) {
          return errorHandle(error, res)
        }
        res.writeHead(200, {'Content-Type': 'image/png'})
        res.write(data, 'binary')
        res.end()
      })
    }
};

function errorHandle(err, res) {
    res.writeHead(500);
    if (err instanceof Error) {
      res.end(err.message);
    } else if (typeof err === 'string') {
      res.end(err);
    } else {
      res.end('server error!');
    }
}

function route(req, res) {
    let pathname = url.parse(req.url).pathname;
    console.log('pathname:' + pathname);
    if (typeof handlers[pathname] === 'function') {
      handlers[pathname](req, res);
    } else {
      res.statusCode = 302
      res.setHeader('Location', '/start')
      res.end()
    }
}

exports.route = route;