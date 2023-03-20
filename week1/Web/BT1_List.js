const http = require('http')
const fs = require('fs')
const qs = require('qs')

const list = http.createServer((req, res)=>{
   if(req.method==="GET"){
       fs.readFile('./news/todo.html','utf-8',(err,htmtTodo)=>{
           res.write(htmtTodo)
           res.end();
       })
   } else {
       let dataInput = ""
       req.on(data,(chunk)=>{
           dataInput += chunk;
           console.log(dataInput)
       })
       req.on('end',()=>{
           let userInfo = qs.parse(dataInput);
           console.log(userInfo);
           fs.readFile('./news/display.html',"utf-8",(err,htmlDisplay)=>{
               htmlDisplay=htmlDisplay.replace('{job}',userInfo.job);
               htmlDisplay=htmlDisplay.replace('{time}',userInfo.time);
               htmlDisplay=htmlDisplay.replace('{level}',userInfo.level);
               res.write(htmlDisplay);
               res.end();
           })
       })
   }
})
list.listen(3100,'localhost',()=>{
    console.log("List is running")
})