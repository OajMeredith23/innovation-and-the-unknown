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


const stopwords = [
    "a",
    "able",
    "about",
    "above",
    "abst",
    "accordance",
    "according",
    "accordingly",
    "across",
    "act",
    "actually",
    "added",
    "adj",
    "affected",
    "affecting",
    "affects",
    "after",
    "afterwards",
    "again",
    "against",
    "ah",
    "all",
    "almost",
    "alone",
    "along",
    "already",
    "also",
    "although",
    "always",
    "am",
    "among",
    "amongst",
    "an",
    "and",
    "announce",
    "another",
    "any",
    "anybody",
    "anyhow",
    "anymore",
    "anyone",
    "anything",
    "anyway",
    "anyways",
    "anywhere",
    "apparently",
    "approximately",
    "are",
    "aren",
    "arent",
    "arise",
    "around",
    "as",
    "aside",
    "ask",
    "asking",
    "at",
    "auth",
    "available",
    "away",
    "awfully",
    "b",
    "back",
    "be",
    "became",
    "because",
    "become",
    "becomes",
    "becoming",
    "been",
    "before",
    "beforehand",
    "begin",
    "beginning",
    "beginnings",
    "begins",
    "behind",
    "being",
    "believe",
    "below",
    "beside",
    "besides",
    "between",
    "beyond",
    "biol",
    "both",
    "brief",
    "briefly",
    "but",
    "by",
    "c",
    "ca",
    "came",
    "can",
    "cannot",
    "can't",
    "cause",
    "causes",
    "certain",
    "certainly",
    "co",
    "com",
    "come",
    "comes",
    "contain",
    "containing",
    "contains",
    "could",
    "couldnt",
    "d",
    "date",
    "did",
    "didn't",
    "different",
    "do",
    "does",
    "doesn't",
    "doing",
    "done",
    "don't",
    "down",
    "downwards",
    "due",
    "during",
    "e",
    "each",
    "ed",
    "edu",
    "effect",
    "eg",
    "eight",
    "eighty",
    "either",
    "else",
    "elsewhere",
    "end",
    "ending",
    "enough",
    "especially",
    "et",
    "et-al",
    "etc",
    "even",
    "ever",
    "every",
    "everybody",
    "everyone",
    "everything",
    "everywhere",
    "ex",
    "except",
    "f",
    "far",
    "few",
    "ff",
    "fifth",
    "first",
    "five",
    "fix",
    "followed",
    "following",
    "follows",
    "for",
    "former",
    "formerly",
    "forth",
    "found",
    "four",
    "from",
    "further",
    "furthermore",
    "g",
    "gave",
    "get",
    "gets",
    "getting",
    "give",
    "given",
    "gives",
    "giving",
    "go",
    "goes",
    "gone",
    "got",
    "gotten",
    "h",
    "had",
    "happens",
    "hardly",
    "has",
    "hasn't",
    "have",
    "haven't",
    "having",
    "he",
    "hed",
    "hence",
    "her",
    "here",
    "hereafter",
    "hereby",
    "herein",
    "heres",
    "hereupon",
    "hers",
    "herself",
    "hes",
    "hi",
    "hid",
    "him",
    "himself",
    "his",
    "hither",
    "home",
    "how",
    "howbeit",
    "however",
    "hundred",
    "i",
    "id",
    "ie",
    "if",
    "i'll",
    "im",
    "immediate",
    "immediately",
    "importance",
    "important",
    "in",
    "inc",
    "indeed",
    "index",
    "information",
    "instead",
    "into",
    "invention",
    "inward",
    "is",
    "isn't",
    "it",
    "itd",
    "it'll",
    "its",
    "itself",
    "i've",
    "j",
    "just",
    "k",
    "keep	keeps",
    "kept",
    "kg",
    "km",
    "know",
    "known",
    "knows",
    "l",
    "largely",
    "last",
    "lately",
    "later",
    "latter",
    "latterly",
    "least",
    "less",
    "lest",
    "let",
    "lets",
    "like",
    "liked",
    "likely",
    "line",
    "little",
    "'ll",
    "look",
    "looking",
    "looks",
    "ltd",
    "m",
    "made",
    "mainly",
    "make",
    "makes",
    "many",
    "may",
    "maybe",
    "me",
    "mean",
    "means",
    "meantime",
    "meanwhile",
    "merely",
    "mg",
    "might",
    "million",
    "miss",
    "ml",
    "more",
    "moreover",
    "most",
    "mostly",
    "mr",
    "mrs",
    "much",
    "mug",
    "must",
    "my",
    "myself",
    "n",
    "na",
    "name",
    "namely",
    "nay",
    "nd",
    "near",
    "nearly",
    "necessarily",
    "necessary",
    "need",
    "needs",
    "neither",
    "never",
    "nevertheless",
    "new",
    "next",
    "nine",
    "ninety",
    "no",
    "nobody",
    "non",
    "none",
    "nonetheless",
    "noone",
    "nor",
    "normally",
    "nos",
    "not",
    "noted",
    "nothing",
    "now",
    "nowhere",
    "o",
    "obtain",
    "obtained",
    "obviously",
    "of",
    "off",
    "often",
    "oh",
    "ok",
    "okay",
    "old",
    "omitted",
    "on",
    "once",
    "one",
    "ones",
    "only",
    "onto",
    "or",
    "ord",
    "other",
    "others",
    "otherwise",
    "ought",
    "our",
    "ours",
    "ourselves",
    "out",
    "outside",
    "over",
    "overall",
    "owing",
    "own",
    "p",
    "page",
    "pages",
    "part",
    "particular",
    "particularly",
    "past",
    "per",
    "perhaps",
    "placed",
    "please",
    "plus",
    "poorly",
    "possible",
    "possibly",
    "potentially",
    "pp",
    "predominantly",
    "present",
    "previously",
    "primarily",
    "probably",
    "promptly",
    "proud",
    "provides",
    "put",
    "q",
    "que",
    "quickly",
    "quite",
    "qv",
    "r",
    "ran",
    "rather",
    "rd",
    "re",
    "readily",
    "really",
    "recent",
    "recently",
    "ref",
    "refs",
    "regarding",
    "regardless",
    "regards",
    "related",
    "relatively",
    "research",
    "respectively",
    "resulted",
    "resulting",
    "results",
    "right",
    "run",
    "s",
    "said",
    "same",
    "saw",
    "say",
    "saying",
    "says",
    "sec",
    "section",
    "see",
    "seeing",
    "seem",
    "seemed",
    "seeming",
    "seems",
    "seen",
    "self",
    "selves",
    "sent",
    "seven",
    "several",
    "shall",
    "she",
    "shed",
    "she'll",
    "shes",
    "should",
    "shouldn't",
    "show",
    "showed",
    "shown",
    "showns",
    "shows",
    "significant",
    "significantly",
    "similar",
    "similarly",
    "since",
    "six",
    "slightly",
    "so",
    "some",
    "somebody",
    "somehow",
    "someone",
    "somethan",
    "something",
    "sometime",
    "sometimes",
    "somewhat",
    "somewhere",
    "soon",
    "sorry",
    "specifically",
    "specified",
    "specify",
    "specifying",
    "still",
    "stop",
    "strongly",
    "sub",
    "substantially",
    "successfully",
    "such",
    "sufficiently",
    "suggest",
    "sup",
    "sure	t",
    "take",
    "taken",
    "taking",
    "tell",
    "tends",
    "th",
    "than",
    "thank",
    "thanks",
    "thanx",
    "that",
    "that'll",
    "thats",
    "that've",
    "the",
    "their",
    "theirs",
    "them",
    "themselves",
    "then",
    "thence",
    "there",
    "thereafter",
    "thereby",
    "thered",
    "therefore",
    "therein",
    "there'll",
    "thereof",
    "therere",
    "theres",
    "thereto",
    "thereupon",
    "there've",
    "these",
    "they",
    "theyd",
    "they'll",
    "theyre",
    "they've",
    "think",
    "this",
    "those",
    "thou",
    "though",
    "thoughh",
    "thousand",
    "throug",
    "through",
    "throughout",
    "thru",
    "thus",
    "til",
    "tip",
    "to",
    "together",
    "too",
    "took",
    "toward",
    "towards",
    "tried",
    "tries",
    "truly",
    "try",
    "trying",
    "ts",
    "twice",
    "two",
    "u",
    "un",
    "under",
    "unfortunately",
    "unless",
    "unlike",
    "unlikely",
    "until",
    "unto",
    "up",
    "upon",
    "ups",
    "us",
    "use",
    "used",
    "useful",
    "usefully",
    "usefulness",
    "uses",
    "using",
    "usually",
    "v",
    "value",
    "various",
    "'ve",
    "very",
    "via",
    "viz",
    "vol",
    "vols",
    "vs",
    "w",
    "want",
    "wants",
    "was",
    "wasnt",
    "way",
    "we",
    "wed",
    "welcome",
    "we'll",
    "went",
    "were",
    "werent",
    "we've",
    "what",
    "whatever",
    "what'll",
    "whats",
    "when",
    "whence",
    "whenever",
    "where",
    "whereafter",
    "whereas",
    "whereby",
    "wherein",
    "wheres",
    "whereupon",
    "wherever",
    "whether",
    "which",
    "while",
    "whim",
    "whither",
    "who",
    "whod",
    "whoever",
    "whole",
    "who'll",
    "whom",
    "whomever",
    "whos",
    "whose",
    "why",
    "widely",
    "willing",
    "wish",
    "with",
    "within",
    "without",
    "wont",
    "words",
    "world",
    "would",
    "wouldnt",
    "www",
    "x",
    "y",
    "yes",
    "yet",
    "you",
    "youd",
    "you'll",
    "your",
    "youre",
    "yours",
    "yourself",
    "yourselves",
    "you've",
    "z",
    "zero",
]

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
    const parsedLines = lines.map(text => {
        let textInLowerCase = text.toLowerCase();
        let removePunctuation = textInLowerCase.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
        let removeStopWords = removePunctuation.split(" ").filter((word, i) => !stopwords.includes(word)).join(" ");

        return removeStopWords
    })

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


    // --- MODEL TRAINING, REMOVE THIS IF MODEL HAS BEEN TRAINED AS JSON FILE-- -
    //     Define our model with several hidden layers
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
