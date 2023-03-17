const axios = require("axios");
async function getData(){
    let data = await axios.get('http://jsonplaceholder.typicode.com/posts')
    return data.data
}
getData().then(result=>{
    console.log(result)
})