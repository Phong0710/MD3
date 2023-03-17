async function onMyBrithday(isKayoSick){
    if(!isKayoSick){
        return 2;
    }
    throw new Error("I am sad")
}
async function doSomethingAsync(){
    try{
        let result = await onMyBrithday(true)
        console.log(`I have ${result} cakes`)
    }
    catch (error) {
        console.log(error)
    }
    finally {
        console.log("Party")
    }
}
 doSomethingAsync()