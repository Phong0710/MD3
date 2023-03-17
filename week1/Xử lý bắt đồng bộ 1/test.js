// console.log("Before delay");
//
// function delayBySeconds(sec) {
//     let start = now = Date.now()
//     while(now-start < (sec*1000)) {
//         now = Date.now();
//     }
// }
//
// delayBySeconds(5);
//
// // Executes after delay of 5 seconds
// console.log("After delay");
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
    for (let i = 0; i < 5; i++) {
        console.log(`Waiting ${i} seconds...`);
        await sleep(i * 1000);
    }
    console.log('Done');
}

demo();
