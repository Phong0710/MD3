const http = require("http");
const sever = http.createServer((req, res)=>{
    res.writeHead(200, {'Content-Type' :`text/html`})
    res.write(`<h5 style="color: greenyellow">HELLO WORLD</h5><hr>`)
    res.end()
})
sever.listen(8080,`localhost`);