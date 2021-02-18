
// const axios = require('axios');

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
const URL = 'https://dazzling-mahavira-33ecc2.netlify.app/.netlify/functions/getusers'
// const URL = 'http://localhost:9000/getusers'


async function getData(text) {

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({ text }),
        redirect: 'follow'
    };

    const res = await fetch(URL, requestOptions)

    return res
    // .then(response => response.text())
    // .then(result => console.log(result))
    // .catch(error => console.log('error', error));

}

const btn = document.querySelector('#analyse');
const inputArea = document.querySelector('#input_text');


btn.addEventListener('click', async () => {

    console.log(inputArea)
    getData(inputArea.value)
    // const analysis = getData(text)
})