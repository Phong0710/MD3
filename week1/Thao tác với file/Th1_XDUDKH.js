const fs = require('fs')
const http = require('http')

let sever = http.createServer((req, res) => {
    let dataFile = '';
    let html = '';
    fs.readFile('./TH1/data.json', 'utf-8', (err, htmtData) => {
        dataFile = htmtData.split(',')
        dataFile.forEach((value, index) => {
            html += `
<tr>
    <td>${index + 1}</td>
    <td>${value}</td>
    <td> <button class="btn btn-danger"> Delete</button></td>
</tr>`
        })
    })
    fs.readFile('./TH1/index.html', "utf-8", (err, data) => {
        res.writeHead(200, {"Content-Type": "text/html"})
        data = data.replace('{list-user}', html)
        res.write(data);
        res.end();
    })
})
sever.listen(3100, "localhost", () => {
    console.log('Sever is running')
})