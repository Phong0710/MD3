const http=require('http')
const fs = require('fs')
let sever = http.createServer((req, res) => {
    if(req.method ==="GET"){
        fs.readFile('./TH2/index.html','utf-8',(err, data)=>{
            res.writeHead(200,{'Content-Type':'text/html'})
            res.write(data);
            return  res.end()
        })
    } else {
        throw new Error("Error !!!!")
    }
})
sever.listen(8080,'localhost',()=>{
    console.log('sever is running')
})