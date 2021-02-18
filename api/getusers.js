// const tf = require('@tensorflow/tfjs-node');
import tf from '@tensorflow/tfjs-node'
import { format } from 'date-fns'

export async function handler(event, context) {

    console.log(format(new Date(), 'P'));
    const { text } = JSON.parse(event.body);
    return {
        statusCode: 200,
        body: JSON.stringify({ message: `Hello, ${text}` })
    };
}

// async function analyseText(text) {


//     const model = await tf.loadLayersModel('./my-model.json')

//     // let text = document.getElementById('user-text').value;

//     document.getElementById("text").innerText = text;

//     let vector = await encoder.embed([text]);
//     let prediction = await model.predict(vector).data();
//     console.log({ prediction })

//     // Get the index of the highest value in the prediction
//     let id = prediction.indexOf(Math.max(...prediction));

//     let predictions = emotions.map((emotion, i) => {
//         return {
//             category: emotion,
//             value: prediction[i].toFixed(2)
//         }
//     })
//         .sort((a, b) => b.value - a.value);

//     console.log({ predictions });

//     return predictions
// }
