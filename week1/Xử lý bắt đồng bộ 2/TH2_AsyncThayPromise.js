async function getDivision(a, b) {
    if (b !== 0) {
        return a / b;
    }
    return new Error("Math error")
}

async function f() {
    try {
        let result = await getDivision(2, 0);
        console.log(result)
    } catch (error) {
        console.log(error.message)
    }
}


// const promise = (a, b) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (b !== 0) {
//                 resolve(a / b)
//             } else {
//                 reject(new Error("Math error 1"))
//             }
//         })
//     })
// }
// promise(7, 0)
//     .then((data) => {
//         console.log(data)
//     })
//     .catch((error) => {
//         console.log(error.message)
//     })
f()