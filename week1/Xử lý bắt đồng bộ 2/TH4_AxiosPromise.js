
axios = require("axios")
function getJSONAPI(){
    return new Promise(resolve => {
        axios.get(`http://jsonplaceholder.typicode.com/posts/1`)
            .then((json)=>{
                resolve(json.data)
            })
    })
}
getJSONAPI().then(data=>{
    console.log(data)
})