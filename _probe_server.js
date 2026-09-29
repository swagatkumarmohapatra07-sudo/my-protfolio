const http = require('http');
const fs = require('fs');
let last = '';
http.createServer((req, res) => {
  let b = '';
  req.on('data', c => b += c);
  req.on('end', () => {
    last = b;
    fs.writeFileSync('probe-log.txt', b);
    res.writeHead(200, {'Access-Control-Allow-Origin':'*','Content-Type':'text/plain'});
    res.end('ok');
  });
}).listen(8765, () => console.log('listening 8765'));
