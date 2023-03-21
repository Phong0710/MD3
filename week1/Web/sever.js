const http = require('http')
const fs = require('fs')
const qs = require("qs")

const sever = http.createServer((req, res) => {
    if(req.method==='GET') {
        fs.readFile("./views/register.html", 'utf-8', (err, htmlRegister) => {
            res.writeHead(200, {'Content': 'text/html'})
            res.write(htmlRegister);
            res.end();
        })
    }
    if(req.method==="POST"){
        let dataInput = ""
        req.on('data',(chunk)=>{
            dataInput += chunk;
            console.log(dataInput)
        })
        req.on('end',()=>{
            let userInfo = qs.parse(dataInput);
            console.log(userInfo)
            fs.readFile('./views/info.html','utf-8',(err,dataInfoHtml)=>{
                dataInfoHtml = dataInfoHtml.replace(`{username}`,userInfo.username)
                dataInfoHtml = dataInfoHtml.replace(`{age}`,userInfo.age)
                dataInfoHtml = dataInfoHtml.replace(`{sex}`,userInfo.sex)
                res.writeHead(301,{location: '/'})
                res.write(dataInfoHtml);
                res.end();
            })
        })
    }
})
sever.listen(3000,'localhost',()=>{
    console.log('Sever is running')
})