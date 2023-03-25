const http = require('http')
const qs = require('qs');
const fs = require('fs')

http.createServer((req, res) => {
    if (req.method === "GET") {
        fs.readFile('./data/index.html', "utf-8", (err, indexHtml) => {
            let listUser = JSON.parse(fs.readFileSync("./data/data.json", "utf-8"))
            let html = "";
            for (let i = 0; i < listUser.length; i++) {
                html += `<tr>
        <td>${listUser[i].id}</td>
        <td>${listUser[i].name}</td>
        <td>${listUser[i].price}</td>
        <td>
        <form  method="post">
         <input type="hidden" name="idDelete" value="${listUser[i].id}" >
         <button type="submit">Delete</button>
        </form>
        <form  method="post">
         <input type="hidden" name="idEdit" value="${listUser[i].id}" >
         <button type="submit">Edit</button>
        </form>
         </td>
      </tr>`
            }
            indexHtml = indexHtml.replace('{listUser}', html)
            res.write(indexHtml)
            res.end();
        })
    }
    if (req.method === "POST") {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
            let user = qs.parse(data)
            if (user.idDelete) {
                let listUser = JSON.parse(fs.readFileSync('./data/data.json', 'utf-8'))
                let index = listUser.findIndex(item => {
                    return item.id == user.idDelete;
                })
                listUser.splice(index, 1)
                fs.writeFileSync('./data/data.json', JSON.stringify(listUser))
                res.writeHead(301, {location: '/'})
                res.end()
            } else if (user.idEdit) {
                fs.readFile('./data/edit.html', "utf-8", (err, editHtml) => {
                    let listUser = JSON.parse(fs.readFileSync("./data/data.json", 'utf-8'))
                    let index = listUser.findIndex(item => {
                        console.log(item.id, user.idEdit)
                        return item.id == user.idEdit
                    })
                    let userEdit = listUser[index]
                    editHtml = editHtml.replace("{id}", userEdit.id)
                    editHtml = editHtml.replace("{name}", userEdit.name)
                    editHtml = editHtml.replace("{price}", userEdit.price)
                    res.write(editHtml);
                    res.end()
                })
            } else if (user.idEditNow) {
                let listUser = JSON.parse(fs.readFileSync("./data/data.json", 'utf-8'))
                let index = listUser.findIndex(item => {
                    return item.id == user.idEditNow
                })

                console.log(listUser[index])
                listUser[index] = {id:user.idEditNow, name: user.nameEdit, price: user.priceEdit}
                console.log(listUser[index])
                fs.writeFileSync('./data/data.json',JSON.stringify(listUser))
                res.writeHead(301,{location:'/'})
                res.end()
            } else {
                let listUser = JSON.parse(fs.readFileSync("./data/data.json", "utf-8"))
                user.id = ((listUser.length > 0) ? (+listUser.at(-1).id + 1) : 1)
                listUser.push(user)
                fs.writeFileSync("./data/data.json", JSON.stringify(listUser))
                res.writeHead(301, {location: '/'})
                res.end()
            }
        })
    }
}).listen(3000, () => {
    console.log("Server is running!!")
})