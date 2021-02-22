import { useEffect, useState, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as use from '@tensorflow-models/universal-sentence-encoder';
import { TextArea } from '../../styles/ui_elements/ui_elements'


export default function AnalyseText({ setData, setLoading }) {

    const [encoder, setEncoder] = useState(null);
    const [model, setModel] = useState(null);
    const textInput = useRef(null);


    async function loadEncoder() { // load the tensorflow sentence encoder
        const sentenceEncoder = await use.load();
        setEncoder(sentenceEncoder);
    }

    async function fetchModel() { // Goes to google storage and gets the model I trained before
        try {
            const model = await tf.loadLayersModel("https://storage.googleapis.com/iatunknown/my-model.json");
            setModel(model);
        } catch (error) {
            console.error(error)
        }
    }

    async function setupTensorflow() {
        await loadEncoder();
        await fetchModel();
        return setLoading(false);
    }


    useEffect(() => {
        setupTensorflow(); // wait for tensorflow related stuff to load, the we'll do other fun stuff.
    }, [])

    const handleTextInput = async (e) => {
        e.preventDefault();
        const ENTER_KEY = 13
        if (e.keyCode === ENTER_KEY) { // On each press of the enter key analyse the text and return the emotional sentiment
            setLoading(true);
            const analysis = await analyseText(model, encoder, textInput.current.value);
            setLoading(false);
            setData(analysis); // set the data state of the create_tile page as the returned results
        }
    }

    return (
        <>
            <h1>Analyse Text</h1>
            <TextArea
                ref={textInput}
                onKeyUp={handleTextInput}
                placeholder="Write your story..."
            // cols="50"
            // rows="40"
            ></TextArea>
        </>
    )
}


const analyseText = async (model, encoder, text) => {
    console.log("ANALYSING")
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

    let vector = await encoder.embed([text]);
    let prediction = await model.predict(vector).data();

    let predictions = emotions.map((emotion, i) => {
        return {
            category: emotion, // title of emotion. E.g: Joy
            value: +prediction[i].toFixed(2) // Convert the result to number that is fixed to two decimal places
        }
    })
        .filter(d => d.value > 0)
        .sort((a, b) => b.value - a.value);

    return predictions
}
