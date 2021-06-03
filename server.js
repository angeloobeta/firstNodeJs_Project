const http = require('http');
const url = require('url');
const path = require('path');
const file_system = require('fs');

const mime_types = {
    "html":"text/html",
    "jpg":"image/jpg",
    "jpeg":"image/jpeg",
    "png":"image/png",
    "css":"text/css",
    "js":"text/javascript"
}




const hostname = '127.0.0.1';
const port = 8282;

http.createServer((req, res) => {
    var uri = url.parse(req.url).pathname;
    var file_name = path.join(process.cwd(), unescape(uri));
    console.log('Loading' + uri);
    var stats;

    try{
       stats = file_system.lstatSync(file_name);
    }catch(e){
        res.writeHead(404, {'Content-type':'text/plain'});
        res.write('404 Not Found\n');
        res.end();
        return;
    }

    if (stats.isFile()){
        var mime_type = mime_types[path.extname(file_name).split(".").reverse()[0]];
        res.writeHead(200, {'Content-type':mime_type});

        var file_stream = file_system.createReadStream(file_name);
        file_stream.pipe(res);
    }else {
        if (stats.isDirectory()) {
            res.writeHead(302, {
                'Location': 'index.html'
            });
            res.end();
        } else {
            res.writeHead(500, {'Content-type': 'text/plain'});
            res.write('500 Internal Error\n');
            res.end();
        }
    }
}).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});