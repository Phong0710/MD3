const http = require('http')
const qs = require('qs');
const fs = require('fs')

http.createServer((req, res) => {
    if(req.method==="GET"){
        fs.readFile('./data/index.html',"utf-8",(err,indexHtml)=>{
            let listUser = JSON.parse(fs.readFileSync("./data/data.json","utf-8"))
            console.log(listUser)
            let html = "";
            for (let i = 0; i < listUser.length ; i++) {
                html += `<tr>
        <td>${listUser[i].id}</td>
        <td>${listUser[i].name}</td>
        <td>${listUser[i].price}</td>
        <td>         </td>
      </tr>`
            }
            indexHtml = indexHtml.replace('{listUser}',html)
            res.write(indexHtml)
            res.end();
        })
    } if(req.method==="POST"){
        let data = '';
        req.on('data',chunk => {
            data += chunk;
        })
        req.on('end',()=>{
            let user = qs.parse(data)
            let listUser = JSON.parse(fs.readFileSync("./data/data.json","utf-8"))
            listUser.push(user)
            fs.writeFileSync("./data/data.json",JSON.stringify(listUser))
            res.writeHead(301,{location:'/'})
            res.end()
        })
    }

}).listen(3000,()=>{
    console.log("Server is running!!")
})