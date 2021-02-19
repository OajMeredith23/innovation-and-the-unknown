
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


(async () => {

    // let data = await fetch("web/emotions.tsv").then(r => r.text());
    // let lines = data.split("\n").filter(x => !!x); // Split & remove empty lines


    // const numSamples = 200;
    // let sentences = lines.slice(0, numSamples).map(line => {
    //     let sentence = line.split("\t")[0];
    //     return sentence;
    // });



    // // Load the universal sentence encoder // DON'T REMOVE THIS
    // // setText("Loading USE...");
    // let encoder = await use.load();
    // // setText("Loaded!");
    // let embeddings = await encoder.embed(sentences);




    // let encoder = await use.load();
    // let embeddings = await encoder.embed(sentences);

    // async function analyseText() {


    //     const model = await tf.loadLayersModel('./my-model.json')
    //     const text = text_input.value

    //     document.getElementById("text").innerText = text;

    //     let vector = await encoder.embed([text]);
    //     let prediction = await model.predict(vector).data();

    //     // Get the index of the highest value in the prediction
    //     let id = prediction.indexOf(Math.max(...prediction));

    //     let predictions = emotions.map((emotion, i) => {
    //         return {
    //             category: emotion,
    //             value: prediction[i].toFixed(2)
    //         }
    //     })
    //         .sort((a, b) => b.value - a.value);

    //     return predictions

    // }



})();
