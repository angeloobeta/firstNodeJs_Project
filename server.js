const http = require('http');
const url = require('url');
const path = require('path');
const file_system = require('fs');



const hostname = '127.0.0.1';
const port = 8282;

http.createServer((req, res) => {
    res.writeHead(200, {'Contest-Type': 'text/plain'});
    res.end('Hello World\n');
}).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});