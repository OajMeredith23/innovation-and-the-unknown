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
    // "disappointment",
    // "disapproval",
    // "disgust",
    // "embarrassment",
    // "excitement",
    // "fear",
    // "gratitude",
    // "grief",
    // "joy",
    // "love",
    // "nervousness",
    // "optimism",
    // "pride",
    // "realization",
    // "relief",
    // "remorse",
    // "sadness",
    // "surprise",
    // "neutral"
];

const textContainer = document.querySelector('#text')

// const mockData = Array.from({ length: 20 }).map(e => {
//     return {
//         data: emotions.map(emotion => {
//             return {
//                 category: emotion,
//                 value: Math.random().toFixed(2)
//             }
//         }),
//         text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, maiores! Deleniti nam, tenetur quasi consequuntur obcaecati delectus tempora cumque suscipit.",
//         createdAt: Date.now()
//     }
// })

const mockData = Array.from({ length: 200 }).map(e => {
    return {
        category: emotions[Math.floor(Math.random() * emotions.length)],
        value: Math.random().toFixed(2)
    }
})



text.innerHTML = JSON.stringify(mockData, 2, null);
console.log(mockData)