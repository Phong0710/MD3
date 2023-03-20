
const axios = require("axios")
axios.get(' https://jsonplaceholder.typicode.com/todos')
.then((data)=>{
    let arr = data.data
    let count = 0;
       arr.forEach((value)=>{
          if(value.completed === true)
           count++
       })

    console.log(count)
})

async function check(){
    let count = 0;
    let arr = (await axios.get(' https://jsonplaceholder.typicode.com/todos')).data
    arr.forEach((e)=>{
        if(e.completed===true)
            count++
    })
    console.log(count)
}
check()