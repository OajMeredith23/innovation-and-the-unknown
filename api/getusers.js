// const tf = require('@tensorflow/tfjs-node');
import tf from '@tensorflow/tfjs-node'
import { format } from 'date-fns'


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

let encoder = await use.load();
let embeddings = await encoder.embed(sentences);


async function analyseText(text) {

    let data = await fetch("./emotions.tsv").then(r => r.text());
    let lines = data.split("\n").filter(x => !!x); // Split & remove empty lines

    const numSamples = 200;
    let sentences = lines.slice(0, numSamples).map(line => {
        let sentence = line.split("\t")[0];
        return sentence;
    });


    const model = await tf.loadLayersModel('./my-model.json')


    let vector = await encoder.embed([text]);
    let prediction = await model.predict(vector).data();
    console.log({ prediction })

    // Get the index of the highest value in the prediction
    let id = prediction.indexOf(Math.max(...prediction));

    let predictions = emotions.map((emotion, i) => {
        return {
            category: emotion,
            value: prediction[i].toFixed(2)
        }
    })
        .sort((a, b) => b.value - a.value);

    console.log({ predictions });

    return predictions
}



export async function handler(event, context) {

    console.log(format(new Date(), 'P'));
    const { text } = JSON.parse(event.body);

    const analysis = await analyseText(text)
    return {
        statusCode: 200,
        body: JSON.stringify({ message: `${text}`, analysis })
    };
}
