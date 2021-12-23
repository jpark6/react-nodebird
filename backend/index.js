const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    res.end('Hello Node');
});

const callback = () => {
    console.log('Server started : 3065');
}

server.listen(3065, callback);
