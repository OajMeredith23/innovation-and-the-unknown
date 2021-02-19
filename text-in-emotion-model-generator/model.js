const loadingStatus = document.querySelector('#loading_status');

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

function setText(text) {
    document.getElementById("status").innerText = text;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

(async () => {

    //     // Load GoEmotions data (https://github.com/google-research/google-research/tree/master/goemotions)
    let data = await fetch("web/emotions.tsv").then(r => r.text());
    let lines = data.split("\n").filter(x => !!x); // Split & remove empty lines

    // Randomize the lines
    // --- CAN REMOVE AFTER TRAINING ---
    // shuffleArray(lines);

    const numSamples = 200;
    let sentences = lines.slice(0, numSamples).map(line => {
        let sentence = line.split("\t")[0];
        return sentence;
    });


    // --- CAN REMOVE AFTER TRAINING ---
    console.log("lines => ", lines)
    let outputs = lines.slice(0, numSamples).map(line => {
        let categories = line.split("\t")[1].split(",").map(x => parseInt(x));
        let output = [];
        for (let i = 0; i < emotions.length; i++) {
            output.push(categories.includes(i) ? 1 : 0);
        }
        return output;
    });
    // --- END CAN REMOVE AFTER TRAINING ---

    // Load the universal sentence encoder // DON'T REMOVE THIS
    setText("Loading USE...");
    let encoder = await use.load();
    setText("Loaded!");
    let embeddings = await encoder.embed(sentences);


    // --- MODEL TRAINING, REMOVE THIS IF MODEL HAS BEEN TRAINED AS JSON FILE ---
    // Define our model with several hidden layers
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 100, activation: "relu", inputShape: [512] }));
    model.add(tf.layers.dense({ units: 50, activation: "relu" }));
    model.add(tf.layers.dense({ units: 25, activation: "relu" }));
    model.add(tf.layers.dense({
        units: emotions.length,
        activation: "softmax"
    }));

    model.compile({
        optimizer: tf.train.adam(),
        loss: "categoricalCrossentropy",
        metrics: ["accuracy"]
    });

    const xs = embeddings;
    const ys = tf.stack(outputs.map(x => tf.tensor1d(x)));
    await model.fit(xs, ys, {
        epochs: 50,
        shuffle: true,
        callbacks: {
            onEpochEnd: (epoch, logs) => {
                setText(`Training... Epoch #${epoch} (${logs.acc})`);
                console.log("Epoch #", epoch, logs);
            }
        }
    });
    const saveResult = await model.save('downloads://my-model');
    // END TRAINING

    // --- DO NOT REMOVE CODE BELOW THIS LINE ---

    // CODE FROM HERE LOADS THE MODEL AND RUNS THE TENSORFLOW ALGORITHM ON EACH KEY PRESS, THE RESULT IS DISPLAY

    setText("Loading USE...");
    setText("Loaded!");



    let text_input = document.getElementById('user-text');



    async function analyseText() {


        const model = await tf.loadLayersModel('./my-model.json')
        const text = text_input.value

        document.getElementById("text").innerText = text;

        let vector = await encoder.embed([text]);
        let prediction = await model.predict(vector).data();

        // Get the index of the highest value in the prediction
        let id = prediction.indexOf(Math.max(...prediction));

        let predictions = emotions.map((emotion, i) => {
            return {
                category: emotion,
                value: prediction[i].toFixed(2)
            }
        })
            .sort((a, b) => b.value - a.value);

        document.querySelector('#results').innerText = JSON.stringify(predictions, null, 2)

        setText(`Result: ${emotions[id]}`);

    }


    const SPACEBAR = 32;
    const FULLSTOP = 190;
    const ENTER = 13

    text_input.onkeyup = async function (e) {

        const key = e.which || e.keyCode;

        if (key === ENTER) {
            console.log("1 =>", text_input.value)
            loadingStatus.innerText = "Analysing...";

            await analyseText(text.value);
            loadingStatus.innerText = "";
        }

    }


})();
