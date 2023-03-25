const http = require('http');
const fs = require('fs')
const qs = require('qs')

http.createServer((req, res) => {
    if (req.method == "GET") {
        console.log(req.method)
        fs.readFile('./computerData/option.html', "utf-8", (err, optionHtml) => {
            res.write(optionHtml)
            res.end()
        })
    }else if (req.method == "POST") {
        let data = '';
        req.on('data', chunk => {
            data += chunk
        })
        req.on('end', () => {
            let number = qs.parse(data)
            fs.readFile('./computerData/option.html', "utf-8", (err, optionHtml) => {
                let option = JSON.parse(fs.readFileSync("./computerData/data.json", "utf-8"))
                option.push(number)
                console.log(option)
                fs.writeFileSync('./computerData/data.json', JSON.stringify(option))
                let a = +option[option.length - 1].nhapa
                let b = +option[option.length - 1].nhapb;
                let select = option[option.length - 1].chon;
                let result = 0
                if (select === "+") {
                    result = a + b;
                } else if (select === "-") {
                    result = a - b;
                } else if (select === "*") {
                    result = a * b;
                } else if (select === "/") {
                    result = a / b;
                }
                optionHtml = optionHtml.replace('{result}', result)
                optionHtml = optionHtml.replace('{nhapA}', a)
                optionHtml = optionHtml.replace('{nhapB}', b)

                // fs.writeFileSync("./computerData/data.json", JSON.stringify(optionHtml))
                res.write(optionHtml)
                res.end()
            })
        })

    }

}).listen(3000, () => {
    console.log('Computer is running')
})