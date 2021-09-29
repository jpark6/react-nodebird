const http = require('http');

const port = 3060;
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  res.end('hello nodeJS');
});

server.listen(port, () => {
  console.log(`NodeJs Server Listening on ${port}`);
});
