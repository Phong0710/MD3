

const axios = require("axios")
async function getAllUser(number){
    let data = await axios.get('https://jsonplaceholder.typicode.com/users')
    return data.data[number-1]
}
getAllUser(6).then(e=>{
    console.log(e)
})