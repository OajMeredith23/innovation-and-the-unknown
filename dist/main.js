
// const axios = require('axios');

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
const URL = 'https://dazzling-mahavira-33ecc2.netlify.app/.netlify/functions/getusers'
// const URL = 'http://localhost:9000/getusers'

const emotions = [
    "admiration",
    "amusement",
    "anger",
    "annoyance",
    "approval",
    "caring",
    "confusion",
    "curiosity",
    "desire",
    "disappointment",
    "disapproval",
    "disgust",
    "embarrassment",
    "excitement",
    "fear",
    "gratitude",
    "grief",
    "joy",
    "love",
    "nervousness",
    "optimism",
    "pride",
    "realization",
    "relief",
    "remorse",
    "sadness",
    "surprise",
    "neutral"
];

let data = await fetch("web/emotions.tsv").then(r => r.text());

let encoder = await use.load();
let embeddings = await encoder.embed(sentences);



async function getData(text) {

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({ text }),
        redirect: 'follow'
    };

    fetch(URL, requestOptions)
        .then(response => response.text())
        .then(result => console.log(JSON.parse(result)))
        .catch(error => console.log('error', error));

}

const btn = document.querySelector('#analyse');
const inputArea = document.querySelector('#input_text');


btn.addEventListener('click', async () => {

    console.log(inputArea)
    getData(inputArea.value)
    analyseText('Because of the pandemic, John and I are thousands of miles apart and separated by borders that are indefinitely closed. On my weekend, he takes me on a trip to South Korea through Google Maps. We “stay” at the beautiful Hotel Shilla, where the daily rate costs more than my weekly food budget. We go on Street View to see the school John grew up attending and visit his favorite childhood haunts. We travel to different cities, my cursor dragging through streets and alleyways. John says, “I hope I can take you there for real one day.” ')
    // const analysis = getData(text)
})