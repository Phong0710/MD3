const http = require('http')
const fs = require('fs')
const qs = require('qs')

let sever = http.createServer((req, res) => {
    if (req.method === "GET") {
        fs.readFile("./BT1/index.html", "utf-8", (err, indexHtml) => {
            let listUser = JSON.parse(fs.readFileSync('./BT1/data.json', 'utf-8'));
            let html = "";
            for (let i = 0; i < listUser.length; i++) {
                html += `<tr>
        <td>${listUser[i].id}</td>
        <td>${listUser[i].name}</td>
        <td>${listUser[i].price}</td>
        <td> 
        <form  method="post">
         <input type="hidden"  name="idDelete" value="${listUser[i].id}">
         <button type="submit" class="btn btn-danger" >Delete</button>
         </form>
         <form  method="post">
         <input type="hidden"  name="idEdit" value="${listUser[i].id}">
         <button type="submit" class="btn btn-danger" >Edit</button>
         </form>
        </td>
      </tr>`
            }
            indexHtml = indexHtml.replace('{listUser}', html);
            res.write(indexHtml);
            res.end()
        })
    }
    if (req.method === "POST") {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on("end", () => {
            let user = qs.parse(data)
            if (user['idDelete']) {
                let listUser = JSON.parse(fs.readFileSync('./BT1/data.json', 'utf-8'))
                let index = listUser.findIndex(item => {
                    return item.id == user.idDelete
                })
                listUser.splice(index, 1)
                fs.writeFileSync('./BT1/data.json', JSON.stringify(listUser));
                res.writeHead(301, {location: "/"})
                res.end();
            } else if (user['idEdit']) {
                console.log("eDITING")
                fs.readFile('./BT1/edit.html', 'utf-8', (err, editHtml) => {
                    let listUser = JSON.parse(fs.readFileSync('./BT1/data.json', 'utf-8'));
                    console.log(listUser)
                    let index = listUser.findIndex(item => {
                        return item.id == user.idEdit
                    });

                    console.log(index, user.idEdit)
                    let userEdit = listUser[index];
                    editHtml = editHtml.replace(`{id}`, userEdit.id)
                    editHtml = editHtml.replace('{name}', userEdit.name)
                    editHtml = editHtml.replace('{price}', userEdit.price)
                    res.write(editHtml);
                    res.end()
                    console.log("Show edit infor complete")
                })
            } else if (user.idEditNow) {
                console.log("Changing database")
                let listUser = JSON.parse(fs.readFileSync('./BT1/data.json', 'utf-8'));
                let index = listUser.findIndex(item => {
                    return item.id == +(user.idEditNow)
                });
                console.log(index, user.idEditNow)
                listUser[index] = {id: user.idEditNow, name: user.nameEdit, price: user.priceEdit};
                fs.writeFileSync('./BT1/data.json', JSON.stringify(listUser));
                res.writeHead(301, {location: "/"})
                res.end();
            } else {
                console.log("adding new")
                let listUser = JSON.parse(fs.readFileSync('./BT1/data.json', 'utf-8'))
                user.id = ((listUser.length > 0) ? +listUser.at(-1).id + 1 : 1).toString();
                listUser.push(user)
                fs.writeFileSync('./BT1/data.json', JSON.stringify(listUser));
                res.writeHead(301, {location: "/"})
                res.end();

            }
        })
    }

})
sever.listen(3000, "localhost", () => {
    console.log("Server is running")
})