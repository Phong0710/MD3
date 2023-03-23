const fs = require('fs')
const http = require('http')


http.createServer((req, res)=>{
    let path= req.url;
    let checkPath=path.split("/")
    let check = checkPath[1]
    let chosenCheck;
    if(routing[check]!==undefined){
        chosenCheck = routing[check]
    }else {
        chosenCheck = router.error
    }
    chosenCheck(req,res)

}).listen(3000,()=>{
    console.log('Server is running')
})
let router ={}
router.home=(req,res)=>{
    fs.readFile('./data/home.html',"utf-8",(err,homeHtml)=>{
        res.write(homeHtml)
        res.end()
    })
}

router.login=(req,res)=>{
    fs.readFile('./data/login.html',"utf-8",(err,loginHtml)=>{
        res.write(loginHtml)
        res.end()
    })

}

router.error=(req,res)=>{
    fs.readFile('./data/error.html',"utf-8",(err,errorHtml)=>{
        res.write(errorHtml)
        res.end()
    })
}
let routing={
    "home":router.home,
    "login":router.login
}