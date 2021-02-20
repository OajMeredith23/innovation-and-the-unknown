import Head from 'next/head'
import { useEffect, useState, useRef } from 'react'
import * as tf from '@tensorflow/tfjs'
import * as use from '@tensorflow-models/universal-sentence-encoder'
// import myModel from '../data/my-model.json'
import styles from '../styles/Home.module.css'

export default function Home() {

  const [loading, setLoading] = useState(true);
  const [encoder, setEncoder] = useState(null);
  const [model, setModel] = useState(null);
  const [tempResult, setTempResult] = useState({});
  const textInput = useRef(null);

  async function loadEncoder() {
    const sentenceEncoder = await use.load();
    setEncoder(sentenceEncoder);
  }

  async function fetchModel() {

    try {
      // const m = await fetch('https://innovation_and_the_unknown.storage.googleapis.com/my-model.json');
      // const m = await fetch('https://innovation_and_the_unknown.storage.googleapis.com/my-model.json');

      // var myHeaders = new Headers();
      // myHeaders.append("Content-Type", "application/json");
      // myHeaders.append("Access-Control-Request-Headers", "application/json");
      // myHeaders.append("Access-Control-Request-Method", "application/json");

      // var requestOptions = {
      //   method: 'GET',
      //   headers: myHeaders,
      //   redirect: 'follow'
      // };

      // const m = await fetch("https://innovation_and_the_unknown.storage.googleapis.com/my-model.json", requestOptions)

      // console.log(await m.json())
      // // const model = await tf.loadLayersModel(m)
      // const model = await tf.loadLayersModel("https://innovation_and_the_unknown.storage.googleapis.com/my-model.json");
      const model = await tf.loadLayersModel("https://storage.googleapis.com/innovation_and_the_unknown/my-model.json");
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
    setupTensorflow();
  }, [])


  const handleTextInput = async (e) => {
    e.preventDefault();
    const ENTER_KEY = 13
    if (e.keyCode === ENTER_KEY) {
      const analysis = await analyseText(model, encoder, textInput.current.value);
      setTempResult(analysis);
      console.log(analysis)
    }
  }

  return (
    <div>
      <h1>{loading ? 'loading...' : 'done'}</h1>
      <textarea
        ref={textInput}
        onKeyUp={handleTextInput}
        cols="30"
        rows="10"
      ></textarea>

      <p>{JSON.stringify(tempResult, null, 2)}</p>
    </div>
  )
}

const analyseText = async (model, encoder, text) => {

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
      category: emotion,
      value: prediction[i].toFixed(2)
    }
  })
    .sort((a, b) => b.value - a.value);

  return predictions

}