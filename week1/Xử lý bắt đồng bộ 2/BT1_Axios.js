const axios = require("axios");

function getPictureOfDay(){
    return new Promise(resolve => {
        axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
            .then(e=>{
                resolve(e.data)
            })
    })

}
getPictureOfDay().then(e=>{
    console.log(e)
})