async function getNumber(arr) {
    let max = 0
    if (arr instanceof Array) {
        arr.forEach((i) => {
            if (i > max) {
                max = i
            }
        })
        return max;
    }
    throw new Error("Error !!!")
}

async function getMax() {
    try {
        let result = await getNumber(1, 2);
        console.log(`Số lớn nhất là ${result}`)
    } catch (error) {
        console.log(error.message)
    }
}

getMax()