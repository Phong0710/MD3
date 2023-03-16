//let money = 10000;
let carMoney=10000;
const buyCar = (car) => {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            if(money>=carMoney){
                resolve(`buy ${car}`)
            } else {
                reject(Error(`Do not enough money`))
            }
        },1000)
    })
}
let money=1000;
buyCar(`Vios`)
.then((result)=>{
    console.log(`I ${result} Car`)
})
.catch((error)=>{
    console.log(error.message)
})