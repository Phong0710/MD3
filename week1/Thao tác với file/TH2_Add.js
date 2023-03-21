const http = require('http')
const fs = require('fs')
const qs = require("qs");
let sever = http.createServer((req, res) => {
    if (req.method === "GET") {
        fs.readFile('./TH2/index.html', 'utf-8', (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(data);
            return res.end()
        })
    } else {
        let data = '';
        req.on('data', chunk => {
            data += chunk
        })
        req.on("end", () => {
            let name = qs.parse(data).name;
            fs.writeFile("./TH2/data.json", name, (err) => {
                if (err) {
                    console.log('err')
                }
                return res.end('Creat success')

            })
        })
        req.on('error', () => {
            console.log('Error')
        })
    }
})
sever.listen(8080, 'localhost', () => {
    console.log('sever is running')
})